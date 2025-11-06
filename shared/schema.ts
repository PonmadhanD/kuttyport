import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  decimal,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth with role support
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role", { length: 50 }).notNull().default('customer'), // customer, delivery_partner, employee, admin
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Hubs table
export const hubs = pgTable("hubs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // local, regional, port
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull().default('India'),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  capacity: integer("capacity").default(100),
  currentLoad: integer("current_load").default(0),
  status: varchar("status", { length: 50 }).default('active'), // active, inactive, maintenance
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Hub = typeof hubs.$inferSelect;
export type InsertHub = typeof hubs.$inferInsert;

// Delivery Partners table
export const deliveryPartners = pgTable("delivery_partners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  vehicleType: varchar("vehicle_type", { length: 100 }).notNull(), // bike, van, truck
  vehicleNumber: varchar("vehicle_number", { length: 50 }).notNull(),
  licenseNumber: varchar("license_number", { length: 50 }).notNull(),
  shiftType: varchar("shift_type", { length: 50 }).notNull(), // customer_hub, hub_hub
  shiftTiming: varchar("shift_timing", { length: 50 }), // morning, evening, night
  status: varchar("status", { length: 50 }).default('pending'), // pending, approved, active, inactive
  performanceScore: decimal("performance_score", { precision: 3, scale: 2 }).default('0'),
  totalDeliveries: integer("total_deliveries").default(0),
  totalEarnings: decimal("total_earnings", { precision: 10, scale: 2 }).default('0'),
  currentHub: varchar("current_hub").references(() => hubs.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type DeliveryPartner = typeof deliveryPartners.$inferSelect;
export type InsertDeliveryPartner = typeof deliveryPartners.$inferInsert;

// Shipments table
export const shipments = pgTable("shipments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  trackingNumber: varchar("tracking_number", { length: 50 }).notNull().unique(),
  customerId: varchar("customer_id").notNull().references(() => users.id),
  
  // Pickup details
  pickupType: varchar("pickup_type", { length: 50 }).notNull(), // doorstep, hub_drop
  pickupAddress: text("pickup_address"),
  pickupCity: varchar("pickup_city", { length: 100 }),
  pickupState: varchar("pickup_state", { length: 100 }),
  pickupPincode: varchar("pickup_pincode", { length: 20 }),
  pickupDate: timestamp("pickup_date"),
  
  // Package details
  packageType: varchar("package_type", { length: 100 }).notNull(),
  packageWeight: decimal("package_weight", { precision: 10, scale: 2 }).notNull(),
  packageDimensions: text("package_dimensions"), // JSON string: {length, width, height}
  packageValue: decimal("package_value", { precision: 10, scale: 2 }).notNull(),
  
  // Destination details
  destinationCountry: varchar("destination_country", { length: 100 }).notNull(),
  destinationPort: varchar("destination_port", { length: 100 }).notNull(),
  
  // Status and tracking
  status: varchar("status", { length: 50 }).default('pending'), // pending, picked_up, at_local_hub, at_regional_hub, at_port, in_transit, customs_clearance, delivered, cancelled
  currentLocation: varchar("current_location"),
  currentHub: varchar("current_hub").references(() => hubs.id),
  estimatedDelivery: timestamp("estimated_delivery"),
  actualDelivery: timestamp("actual_delivery"),
  
  // Pricing
  baseCost: decimal("base_cost", { precision: 10, scale: 2 }).notNull(),
  insuranceCost: decimal("insurance_cost", { precision: 10, scale: 2 }).default('0'),
  totalCost: decimal("total_cost", { precision: 10, scale: 2 }).notNull(),
  paymentStatus: varchar("payment_status", { length: 50 }).default('pending'), // pending, paid, refunded
  
  // Insurance
  hasInsurance: boolean("has_insurance").default(false),
  
  // Documents
  customsDocuments: text("customs_documents"), // JSON array of document URLs
  invoiceUrl: varchar("invoice_url"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Shipment = typeof shipments.$inferSelect;
export type InsertShipment = typeof shipments.$inferInsert;

export const insertShipmentSchema = createInsertSchema(shipments).omit({
  id: true,
  trackingNumber: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertShipmentType = z.infer<typeof insertShipmentSchema>;

// Tracking history table
export const trackingHistory = pgTable("tracking_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  shipmentId: varchar("shipment_id").notNull().references(() => shipments.id),
  status: varchar("status", { length: 50 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  description: text("description").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  timestamp: timestamp("timestamp").defaultNow(),
});

export type TrackingHistory = typeof trackingHistory.$inferSelect;
export type InsertTrackingHistory = typeof trackingHistory.$inferInsert;

// Routes table
export const routes = pgTable("routes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  deliveryPartnerId: varchar("delivery_partner_id").notNull().references(() => deliveryPartners.id),
  shipmentId: varchar("shipment_id").notNull().references(() => shipments.id),
  fromHub: varchar("from_hub").references(() => hubs.id),
  toHub: varchar("to_hub").references(() => hubs.id),
  status: varchar("status", { length: 50 }).default('assigned'), // assigned, in_progress, completed, cancelled
  estimatedDistance: decimal("estimated_distance", { precision: 10, scale: 2 }),
  actualDistance: decimal("actual_distance", { precision: 10, scale: 2 }),
  estimatedTime: integer("estimated_time"), // in minutes
  actualTime: integer("actual_time"), // in minutes
  earnings: decimal("earnings", { precision: 10, scale: 2 }),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Route = typeof routes.$inferSelect;
export type InsertRoute = typeof routes.$inferInsert;

// Support tickets table
export const supportTickets = pgTable("support_tickets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  shipmentId: varchar("shipment_id").references(() => shipments.id),
  subject: varchar("subject", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 50 }).default('open'), // open, in_progress, resolved, closed
  priority: varchar("priority", { length: 50 }).default('medium'), // low, medium, high
  assignedTo: varchar("assigned_to").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type SupportTicket = typeof supportTickets.$inferSelect;
export type InsertSupportTicket = typeof supportTickets.$inferInsert;

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  shipments: many(shipments),
  deliveryPartner: many(deliveryPartners),
  supportTickets: many(supportTickets),
}));

export const shipmentsRelations = relations(shipments, ({ one, many }) => ({
  customer: one(users, {
    fields: [shipments.customerId],
    references: [users.id],
  }),
  hub: one(hubs, {
    fields: [shipments.currentHub],
    references: [hubs.id],
  }),
  trackingHistory: many(trackingHistory),
  routes: many(routes),
}));

export const deliveryPartnersRelations = relations(deliveryPartners, ({ one, many }) => ({
  user: one(users, {
    fields: [deliveryPartners.userId],
    references: [users.id],
  }),
  hub: one(hubs, {
    fields: [deliveryPartners.currentHub],
    references: [hubs.id],
  }),
  routes: many(routes),
}));

export const routesRelations = relations(routes, ({ one }) => ({
  deliveryPartner: one(deliveryPartners, {
    fields: [routes.deliveryPartnerId],
    references: [deliveryPartners.id],
  }),
  shipment: one(shipments, {
    fields: [routes.shipmentId],
    references: [shipments.id],
  }),
  fromHub: one(hubs, {
    fields: [routes.fromHub],
    references: [hubs.id],
  }),
  toHub: one(hubs, {
    fields: [routes.toHub],
    references: [hubs.id],
  }),
}));

export const trackingHistoryRelations = relations(trackingHistory, ({ one }) => ({
  shipment: one(shipments, {
    fields: [trackingHistory.shipmentId],
    references: [shipments.id],
  }),
}));

export const supportTicketsRelations = relations(supportTickets, ({ one }) => ({
  user: one(users, {
    fields: [supportTickets.userId],
    references: [users.id],
  }),
  shipment: one(shipments, {
    fields: [supportTickets.shipmentId],
    references: [shipments.id],
  }),
  assignee: one(users, {
    fields: [supportTickets.assignedTo],
    references: [users.id],
  }),
}));
