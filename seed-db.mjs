import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./drizzle/schema.js";


const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

async function seed() {
  const connection = await mysql.createConnection(DATABASE_URL);
  const db = drizzle(connection, { schema, mode: "default" });

  console.log("🌱 Starting database seed...");

  try {
    // Get or create a test user
    const users = await db.select().from(schema.users).limit(1);
    let userId = users[0]?.id;

    if (!userId) {
      console.log("Creating test user...");
      const result = await db.insert(schema.users).values({
        openId: "test-user-001",
        name: "John Contractor",
        email: "john@contractor.com",
        loginMethod: "test",
        role: "user",
      });
      userId = result[0].insertId;
    }

    console.log(`Using user ID: ${userId}`);

    // Create sample clients
    console.log("Creating sample clients...");
    const clientIds = [];
    const clientNames = [
      { name: "Sarah Johnson", email: "sarah@example.com", company: "Johnson Homes" },
      { name: "Michael Chen", email: "michael@example.com", company: "Chen Developments" },
      { name: "Emily Rodriguez", email: "emily@example.com", company: "Rodriguez Properties" },
    ];

    for (const client of clientNames) {
      const result = await db.insert(schema.clients).values({
        userId,
        name: client.name,
        email: client.email,
        phone: "555-0100",
        address: "123 Main St",
        city: "Springfield",
        state: "IL",
        zipCode: "62701",
        country: "USA",
        companyName: client.company,
        notes: `Regular client - ${client.company}`,
        isActive: true,
      });
      clientIds.push(result[0].insertId);
    }

    // Create sample items
    console.log("Creating sample items...");
    const itemIds = [];
    const items = [
      { name: "Labor - Hourly", description: "General labor", category: "Labor", unit: "hour", cost: "25", price: "50" },
      { name: "Drywall Installation", description: "Drywall per sq ft", category: "Materials", unit: "sqft", cost: "0.50", price: "1.50" },
      { name: "Painting", description: "Interior painting", category: "Labor", unit: "sqft", cost: "0.75", price: "2.00" },
      { name: "Flooring - Tile", description: "Ceramic tile", category: "Materials", unit: "sqft", cost: "3.00", price: "8.00" },
      { name: "Electrical Work", description: "Electrical installation", category: "Labor", unit: "hour", cost: "40", price: "85" },
    ];

    for (const item of items) {
      const result = await db.insert(schema.items).values({
        userId,
        name: item.name,
        description: item.description,
        category: item.category,
        unit: item.unit,
        cost: item.cost,
        markupPercentage: "100",
        price: item.price,
        isActive: true,
      });
      itemIds.push(result[0].insertId);
    }

    // Create sample projects
    console.log("Creating sample projects...");
    const projectIds = [];
    const projects = [
      { clientId: clientIds[0], name: "Kitchen Renovation", status: "active", budget: "15000" },
      { clientId: clientIds[1], name: "Bathroom Remodel", status: "active", budget: "8000" },
      { clientId: clientIds[2], name: "Office Painting", status: "completed", budget: "3000" },
    ];

    for (const project of projects) {
      const result = await db.insert(schema.projects).values({
        userId,
        clientId: project.clientId,
        name: project.name,
        description: `${project.name} project`,
        status: project.status,
        estimatedBudget: project.budget,
        startDate: new Date(),
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      });
      projectIds.push(result[0].insertId);
    }

    // Create sample bids
    console.log("Creating sample bids...");
    const bidIds = [];
    for (let i = 0; i < projectIds.length; i++) {
      const result = await db.insert(schema.bids).values({
        userId,
        projectId: projectIds[i],
        clientId: clientIds[i],
        bidNumber: `EST-${1001 + i}`,
        title: `Estimate for ${projects[i].name}`,
        description: `Professional estimate for ${projects[i].name}`,
        status: i === 2 ? "accepted" : "sent",
        totalAmount: projects[i].budget,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
      bidIds.push(result[0].insertId);
    }

    // Add bid line items
    console.log("Adding bid line items...");
    for (let i = 0; i < bidIds.length; i++) {
      await db.insert(schema.bidLineItems).values({
        userId,
        bidId: bidIds[i],
        itemId: itemIds[i % itemIds.length],
        description: items[i % items.length].name,
        quantity: "10",
        unitPrice: items[i % items.length].price,
        section: "Materials",
        totalPrice: (10 * parseFloat(items[i % items.length].price)).toString(),
      });

      await db.insert(schema.bidLineItems).values({
        userId,
        bidId: bidIds[i],
        itemId: itemIds[(i + 1) % itemIds.length],
        description: items[(i + 1) % items.length].name,
        quantity: "20",
        unitPrice: items[(i + 1) % items.length].price,
        section: "Labor",
        totalPrice: (20 * parseFloat(items[(i + 1) % items.length].price)).toString(),
      });
    }

    // Create sample invoices
    console.log("Creating sample invoices...");
    const invoiceIds = [];
    for (let i = 0; i < projectIds.length; i++) {
      const result = await db.insert(schema.invoices).values({
        userId,
        projectId: projectIds[i],
        clientId: clientIds[i],
        bidId: bidIds[i],
        invoiceNumber: `INV-${1001 + i}`,
        title: `Invoice for ${projects[i].name}`,
        description: `Invoice for ${projects[i].name}`,
        status: i === 0 ? "sent" : i === 1 ? "paid" : "draft",
        subtotal: projects[i].budget,
        totalAmount: projects[i].budget,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
      invoiceIds.push(result[0].insertId);
    }

    // Add invoice line items
    console.log("Adding invoice line items...");
    for (let i = 0; i < invoiceIds.length; i++) {
      await db.insert(schema.invoiceLineItems).values({
        userId,
        invoiceId: invoiceIds[i],
        itemId: itemIds[i % itemIds.length],
        description: items[i % items.length].name,
        quantity: "15",
        unitPrice: items[i % items.length].price,
        section: "Materials",
        totalPrice: (15 * parseFloat(items[i % items.length].price)).toString(),
      });

      await db.insert(schema.invoiceLineItems).values({
        userId,
        invoiceId: invoiceIds[i],
        itemId: itemIds[(i + 1) % itemIds.length],
        description: items[(i + 1) % items.length].name,
        quantity: "25",
        unitPrice: items[(i + 1) % items.length].price,
        section: "Labor",
        totalPrice: (25 * parseFloat(items[(i + 1) % items.length].price)).toString(),
      });
    }

    // Create sample payments
    console.log("Creating sample payments...");
      await db.insert(schema.payments).values({
        userId,
        invoiceId: invoiceIds[1],
        amount: projects[1].budget,
        paymentMethod: "card",
        transactionId: "TXN-12345",
        notes: "Payment received for bathroom remodel",
      });

    // Create business settings
    console.log("Creating business settings...");
      try {
        await db.insert(schema.businessSettings).values({
          userId,
          businessName: "John's Construction",
          businessEmail: "john@contractor.com",
          businessPhone: "555-0100",
          businessAddress: "456 Business Ave",
          businessCity: "Springfield",
          businessState: "IL",
          businessZipCode: "62701",
          businessCountry: "USA",
          taxId: "12-3456789",
          defaultCurrency: "USD",
          defaultTaxRate: "0.10",
          invoicePrefix: "INV",
          bidPrefix: "EST",
          nextInvoiceNumber: 1004,
          nextBidNumber: 1004,
        });
      } catch (e) {
        // Settings might already exist
      }

    // Create notification preferences
    console.log("Creating notification preferences...");
    await db.insert(schema.notificationPreferences).values({
      userId,
      emailOnInvoiceSent: true,
      emailOnPaymentReceived: true,
      emailOnBidSent: true,
      emailOnBidAccepted: true,
      paymentReminderDaysBefore: 3,
      paymentReminderDaysAfter: 7,
      enableEmailNotifications: true,
      enableInAppNotifications: true,
    });

    console.log("✅ Database seed completed successfully!");
    console.log(`Created ${clientIds.length} clients`);
    console.log(`Created ${itemIds.length} items`);
    console.log(`Created ${projectIds.length} projects`);
    console.log(`Created ${bidIds.length} bids`);
    console.log(`Created ${invoiceIds.length} invoices`);
    console.log(`Created 1 payment`);

  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

seed();
