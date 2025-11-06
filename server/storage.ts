import {
  users,
  hubs,
  shipments,
  deliveryPartners,
  trackingHistory,
  routes,
  supportTickets,
  type User,
  type UpsertUser,
  type Hub,
  type InsertHub,
  type Shipment,
  type InsertShipment,
  type DeliveryPartner,
  type InsertDeliveryPartner,
  type TrackingHistory,
  type InsertTrackingHistory,
  type Route,
  type InsertRoute,
  type SupportTicket,
  type InsertSupportTicket,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (IMPORTANT: mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Hub operations
  getAllHubs(): Promise<Hub[]>;
  getHub(id: string): Promise<Hub | undefined>;
  createHub(hub: InsertHub): Promise<Hub>;
  
  // Shipment operations
  getAllShipments(): Promise<Shipment[]>;
  getShipmentsByCustomer(customerId: string): Promise<Shipment[]>;
  getShipment(id: string): Promise<Shipment | undefined>;
  getShipmentByTrackingNumber(trackingNumber: string): Promise<Shipment | undefined>;
  createShipment(shipment: InsertShipment): Promise<Shipment>;
  updateShipment(id: string, updates: Partial<InsertShipment>): Promise<Shipment>;
  
  // Delivery Partner operations
  getAllDeliveryPartners(): Promise<DeliveryPartner[]>;
  getDeliveryPartner(id: string): Promise<DeliveryPartner | undefined>;
  getDeliveryPartnerByUserId(userId: string): Promise<DeliveryPartner | undefined>;
  createDeliveryPartner(partner: InsertDeliveryPartner): Promise<DeliveryPartner>;
  updateDeliveryPartner(id: string, updates: Partial<InsertDeliveryPartner>): Promise<DeliveryPartner>;
  
  // Tracking History operations
  getTrackingHistory(shipmentId: string): Promise<TrackingHistory[]>;
  addTrackingHistory(history: InsertTrackingHistory): Promise<TrackingHistory>;
  
  // Route operations
  getAllRoutes(): Promise<Route[]>;
  getRoutesByDeliveryPartner(partnerId: string): Promise<Route[]>;
  createRoute(route: InsertRoute): Promise<Route>;
  updateRoute(id: string, updates: Partial<InsertRoute>): Promise<Route>;
  
  // Support Ticket operations
  getAllSupportTickets(): Promise<SupportTicket[]>;
  getSupportTicketsByUser(userId: string): Promise<SupportTicket[]>;
  createSupportTicket(ticket: InsertSupportTicket): Promise<SupportTicket>;
  updateSupportTicket(id: string, updates: Partial<InsertSupportTicket>): Promise<SupportTicket>;
}

export class DatabaseStorage implements IStorage {
  // User operations (IMPORTANT: mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Hub operations
  async getAllHubs(): Promise<Hub[]> {
    return await db.select().from(hubs);
  }

  async getHub(id: string): Promise<Hub | undefined> {
    const [hub] = await db.select().from(hubs).where(eq(hubs.id, id));
    return hub;
  }

  async createHub(hubData: InsertHub): Promise<Hub> {
    const [hub] = await db.insert(hubs).values(hubData).returning();
    return hub;
  }

  // Shipment operations
  async getAllShipments(): Promise<Shipment[]> {
    return await db.select().from(shipments).orderBy(desc(shipments.createdAt));
  }

  async getShipmentsByCustomer(customerId: string): Promise<Shipment[]> {
    return await db
      .select()
      .from(shipments)
      .where(eq(shipments.customerId, customerId))
      .orderBy(desc(shipments.createdAt));
  }

  async getShipment(id: string): Promise<Shipment | undefined> {
    const [shipment] = await db.select().from(shipments).where(eq(shipments.id, id));
    return shipment;
  }

  async getShipmentByTrackingNumber(trackingNumber: string): Promise<Shipment | undefined> {
    const [shipment] = await db
      .select()
      .from(shipments)
      .where(eq(shipments.trackingNumber, trackingNumber));
    return shipment;
  }

  async createShipment(shipmentData: InsertShipment): Promise<Shipment> {
    // Generate tracking number
    const trackingNumber = `KP-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    const [shipment] = await db
      .insert(shipments)
      .values({
        ...shipmentData,
        trackingNumber,
      })
      .returning();
    return shipment;
  }

  async updateShipment(id: string, updates: Partial<InsertShipment>): Promise<Shipment> {
    const [shipment] = await db
      .update(shipments)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(shipments.id, id))
      .returning();
    return shipment;
  }

  // Delivery Partner operations
  async getAllDeliveryPartners(): Promise<DeliveryPartner[]> {
    return await db.select().from(deliveryPartners);
  }

  async getDeliveryPartner(id: string): Promise<DeliveryPartner | undefined> {
    const [partner] = await db
      .select()
      .from(deliveryPartners)
      .where(eq(deliveryPartners.id, id));
    return partner;
  }

  async getDeliveryPartnerByUserId(userId: string): Promise<DeliveryPartner | undefined> {
    const [partner] = await db
      .select()
      .from(deliveryPartners)
      .where(eq(deliveryPartners.userId, userId));
    return partner;
  }

  async createDeliveryPartner(partnerData: InsertDeliveryPartner): Promise<DeliveryPartner> {
    const [partner] = await db
      .insert(deliveryPartners)
      .values(partnerData)
      .returning();
    return partner;
  }

  async updateDeliveryPartner(id: string, updates: Partial<InsertDeliveryPartner>): Promise<DeliveryPartner> {
    const [partner] = await db
      .update(deliveryPartners)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(deliveryPartners.id, id))
      .returning();
    return partner;
  }

  // Tracking History operations
  async getTrackingHistory(shipmentId: string): Promise<TrackingHistory[]> {
    return await db
      .select()
      .from(trackingHistory)
      .where(eq(trackingHistory.shipmentId, shipmentId))
      .orderBy(desc(trackingHistory.timestamp));
  }

  async addTrackingHistory(historyData: InsertTrackingHistory): Promise<TrackingHistory> {
    const [history] = await db
      .insert(trackingHistory)
      .values(historyData)
      .returning();
    return history;
  }

  // Route operations
  async getAllRoutes(): Promise<Route[]> {
    return await db.select().from(routes).orderBy(desc(routes.createdAt));
  }

  async getRoutesByDeliveryPartner(partnerId: string): Promise<Route[]> {
    return await db
      .select()
      .from(routes)
      .where(eq(routes.deliveryPartnerId, partnerId))
      .orderBy(desc(routes.createdAt));
  }

  async createRoute(routeData: InsertRoute): Promise<Route> {
    const [route] = await db.insert(routes).values(routeData).returning();
    return route;
  }

  async updateRoute(id: string, updates: Partial<InsertRoute>): Promise<Route> {
    const [route] = await db
      .update(routes)
      .set(updates)
      .where(eq(routes.id, id))
      .returning();
    return route;
  }

  // Support Ticket operations
  async getAllSupportTickets(): Promise<SupportTicket[]> {
    return await db.select().from(supportTickets).orderBy(desc(supportTickets.createdAt));
  }

  async getSupportTicketsByUser(userId: string): Promise<SupportTicket[]> {
    return await db
      .select()
      .from(supportTickets)
      .where(eq(supportTickets.userId, userId))
      .orderBy(desc(supportTickets.createdAt));
  }

  async createSupportTicket(ticketData: InsertSupportTicket): Promise<SupportTicket> {
    const [ticket] = await db
      .insert(supportTickets)
      .values(ticketData)
      .returning();
    return ticket;
  }

  async updateSupportTicket(id: string, updates: Partial<InsertSupportTicket>): Promise<SupportTicket> {
    const [ticket] = await db
      .update(supportTickets)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(supportTickets.id, id))
      .returning();
    return ticket;
  }
}

export const storage = new DatabaseStorage();
