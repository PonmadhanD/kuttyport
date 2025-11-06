import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertShipmentSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware from Replit Auth integration
  await setupAuth(app);

  // Auth routes - get current user
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Hub routes
  app.get('/api/hubs', isAuthenticated, async (req, res) => {
    try {
      const hubs = await storage.getAllHubs();
      res.json(hubs);
    } catch (error) {
      console.error("Error fetching hubs:", error);
      res.status(500).json({ message: "Failed to fetch hubs" });
    }
  });

  app.get('/api/hubs/:id', isAuthenticated, async (req, res) => {
    try {
      const hub = await storage.getHub(req.params.id);
      if (!hub) {
        return res.status(404).json({ message: "Hub not found" });
      }
      res.json(hub);
    } catch (error) {
      console.error("Error fetching hub:", error);
      res.status(500).json({ message: "Failed to fetch hub" });
    }
  });

  app.post('/api/hubs', isAuthenticated, async (req: any, res) => {
    try {
      // Only admin users can create hubs
      const user = await storage.getUser(req.user.claims.sub);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
      }

      // Validate hub data
      const hubSchema = z.object({
        name: z.string().min(1),
        type: z.enum(['local', 'regional', 'port']),
        address: z.string().min(1),
        city: z.string().min(1),
        state: z.string().min(1),
        country: z.string().default('India'),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        capacity: z.number().optional(),
      });

      const result = hubSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.message });
      }

      const hub = await storage.createHub(result.data);
      res.status(201).json(hub);
    } catch (error) {
      console.error("Error creating hub:", error);
      res.status(500).json({ message: "Failed to create hub" });
    }
  });

  // Shipment routes
  app.get('/api/shipments', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Customers see only their shipments, employees/admins see all
      let shipments;
      if (user.role === 'customer') {
        shipments = await storage.getShipmentsByCustomer(user.id);
      } else {
        shipments = await storage.getAllShipments();
      }
      
      res.json(shipments);
    } catch (error) {
      console.error("Error fetching shipments:", error);
      res.status(500).json({ message: "Failed to fetch shipments" });
    }
  });

  app.get('/api/shipments/:id', isAuthenticated, async (req: any, res) => {
    try {
      const shipment = await storage.getShipment(req.params.id);
      if (!shipment) {
        return res.status(404).json({ message: "Shipment not found" });
      }

      // Check access rights
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role === 'customer' && shipment.customerId !== user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }

      res.json(shipment);
    } catch (error) {
      console.error("Error fetching shipment:", error);
      res.status(500).json({ message: "Failed to fetch shipment" });
    }
  });

  app.get('/api/shipments/tracking/:trackingNumber', async (req, res) => {
    try {
      const shipment = await storage.getShipmentByTrackingNumber(req.params.trackingNumber);
      if (!shipment) {
        return res.status(404).json({ message: "Shipment not found" });
      }

      // Get tracking history
      const history = await storage.getTrackingHistory(shipment.id);
      
      res.json({
        shipment,
        history,
      });
    } catch (error) {
      console.error("Error fetching shipment tracking:", error);
      res.status(500).json({ message: "Failed to fetch shipment tracking" });
    }
  });

  app.post('/api/shipments', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Validate request body
      const result = insertShipmentSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.message });
      }

      // Create shipment with user as customer
      const shipmentData = {
        ...result.data,
        customerId: user.id,
      };

      const shipment = await storage.createShipment(shipmentData);

      // Add initial tracking history
      await storage.addTrackingHistory({
        shipmentId: shipment.id,
        status: 'pending',
        location: 'Booking Confirmed',
        description: 'Your shipment has been booked and is awaiting pickup.',
        timestamp: new Date(),
      });

      res.status(201).json(shipment);
    } catch (error) {
      console.error("Error creating shipment:", error);
      res.status(500).json({ message: "Failed to create shipment" });
    }
  });

  app.patch('/api/shipments/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      const shipment = await storage.getShipment(req.params.id);

      if (!shipment) {
        return res.status(404).json({ message: "Shipment not found" });
      }

      // Only employee/admin can update shipments
      if (user?.role === 'customer') {
        return res.status(403).json({ message: "Forbidden: Only staff can update shipments" });
      }

      const updatedShipment = await storage.updateShipment(req.params.id, req.body);

      // Add tracking history if status changed
      if (req.body.status && req.body.status !== shipment.status) {
        await storage.addTrackingHistory({
          shipmentId: shipment.id,
          status: req.body.status,
          location: req.body.currentLocation || shipment.currentLocation || 'In Transit',
          description: `Status updated to ${req.body.status}`,
          timestamp: new Date(),
        });
      }

      res.json(updatedShipment);
    } catch (error) {
      console.error("Error updating shipment:", error);
      res.status(500).json({ message: "Failed to update shipment" });
    }
  });

  // Tracking History routes
  app.get('/api/shipments/:id/history', isAuthenticated, async (req, res) => {
    try {
      const history = await storage.getTrackingHistory(req.params.id);
      res.json(history);
    } catch (error) {
      console.error("Error fetching tracking history:", error);
      res.status(500).json({ message: "Failed to fetch tracking history" });
    }
  });

  // Delivery Partner routes
  app.get('/api/delivery-partners', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      
      // Only employee/admin can view all partners
      if (user?.role !== 'employee' && user?.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden" });
      }

      const partners = await storage.getAllDeliveryPartners();
      res.json(partners);
    } catch (error) {
      console.error("Error fetching delivery partners:", error);
      res.status(500).json({ message: "Failed to fetch delivery partners" });
    }
  });

  app.get('/api/delivery-partners/me', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const partner = await storage.getDeliveryPartnerByUserId(userId);
      
      if (!partner) {
        return res.status(404).json({ message: "Delivery partner profile not found" });
      }

      res.json(partner);
    } catch (error) {
      console.error("Error fetching delivery partner:", error);
      res.status(500).json({ message: "Failed to fetch delivery partner" });
    }
  });

  app.post('/api/delivery-partners', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Check if partner already exists
      const existingPartner = await storage.getDeliveryPartnerByUserId(userId);
      if (existingPartner) {
        return res.status(400).json({ message: "Delivery partner profile already exists" });
      }

      // Validate partner data
      const partnerSchema = z.object({
        vehicleType: z.string().min(1),
        vehicleNumber: z.string().min(1),
        licenseNumber: z.string().min(1),
        shiftType: z.enum(['customer_hub', 'hub_hub']),
        shiftTiming: z.string().optional(),
      });

      const result = partnerSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.message });
      }

      const partnerData = {
        ...result.data,
        userId,
      };

      const partner = await storage.createDeliveryPartner(partnerData);
      
      // Update user role to delivery_partner
      await storage.upsertUser({
        id: userId,
        role: 'delivery_partner',
      });

      res.status(201).json(partner);
    } catch (error) {
      console.error("Error creating delivery partner:", error);
      res.status(500).json({ message: "Failed to create delivery partner" });
    }
  });

  app.patch('/api/delivery-partners/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      const partner = await storage.getDeliveryPartner(req.params.id);

      if (!partner) {
        return res.status(404).json({ message: "Delivery partner not found" });
      }

      // Partner can update own profile, employee/admin can update any
      if (partner.userId !== user?.id && user?.role !== 'employee' && user?.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden" });
      }

      const updatedPartner = await storage.updateDeliveryPartner(req.params.id, req.body);
      res.json(updatedPartner);
    } catch (error) {
      console.error("Error updating delivery partner:", error);
      res.status(500).json({ message: "Failed to update delivery partner" });
    }
  });

  // Route management
  app.get('/api/routes', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      
      if (user?.role === 'delivery_partner') {
        // Delivery partners see only their routes
        const partner = await storage.getDeliveryPartnerByUserId(user.id);
        if (!partner) {
          return res.json([]);
        }
        const routes = await storage.getRoutesByDeliveryPartner(partner.id);
        res.json(routes);
      } else if (user?.role === 'employee' || user?.role === 'admin') {
        // Staff see all routes
        const routes = await storage.getAllRoutes();
        res.json(routes);
      } else {
        return res.status(403).json({ message: "Forbidden" });
      }
    } catch (error) {
      console.error("Error fetching routes:", error);
      res.status(500).json({ message: "Failed to fetch routes" });
    }
  });

  app.post('/api/routes', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      
      // Only employee/admin can create routes
      if (user?.role !== 'employee' && user?.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden: Only staff can create routes" });
      }

      const route = await storage.createRoute(req.body);
      res.status(201).json(route);
    } catch (error) {
      console.error("Error creating route:", error);
      res.status(500).json({ message: "Failed to create route" });
    }
  });

  app.patch('/api/routes/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      const route = await storage.updateRoute(req.params.id, req.body);
      res.json(route);
    } catch (error) {
      console.error("Error updating route:", error);
      res.status(500).json({ message: "Failed to update route" });
    }
  });

  // Support Ticket routes
  app.get('/api/support-tickets', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      
      if (user?.role === 'employee' || user?.role === 'admin') {
        // Staff see all tickets
        const tickets = await storage.getAllSupportTickets();
        res.json(tickets);
      } else {
        // Users see only their tickets
        const tickets = await storage.getSupportTicketsByUser(user!.id);
        res.json(tickets);
      }
    } catch (error) {
      console.error("Error fetching support tickets:", error);
      res.status(500).json({ message: "Failed to fetch support tickets" });
    }
  });

  app.post('/api/support-tickets', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Validate ticket data
      const ticketSchema = z.object({
        shipmentId: z.string().optional(),
        subject: z.string().min(1),
        description: z.string().min(1),
        priority: z.enum(['low', 'medium', 'high']).optional(),
      });

      const result = ticketSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.message });
      }
      
      const ticketData = {
        ...result.data,
        userId,
      };

      const ticket = await storage.createSupportTicket(ticketData);
      res.status(201).json(ticket);
    } catch (error) {
      console.error("Error creating support ticket:", error);
      res.status(500).json({ message: "Failed to create support ticket" });
    }
  });

  app.patch('/api/support-tickets/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      
      // Only employee/admin can update tickets
      if (user?.role !== 'employee' && user?.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden: Only staff can update tickets" });
      }

      const ticket = await storage.updateSupportTicket(req.params.id, req.body);
      res.json(ticket);
    } catch (error) {
      console.error("Error updating support ticket:", error);
      res.status(500).json({ message: "Failed to update support ticket" });
    }
  });

  // AI Chatbot route (OpenAI integration will be added in Task 3)
  app.post('/api/ai/chat', isAuthenticated, async (req: any, res) => {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }

      // TODO: Integrate with OpenAI in Task 3
      // For now, return a placeholder response
      const response = {
        message: "AI assistant is coming soon! For now, please use our support ticket system for assistance.",
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      console.error("Error processing AI chat:", error);
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
