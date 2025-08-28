// Shopify-Style Tutor Booking Platform – Architecture Mockup

/**
 * USER ROLES
 * - Student
 * - Tutor
 * - (Optional) Admin
 */

/**
 * MongoDB Schema Models
 */

// User Schema
const User = {
  _id: ObjectId,
  name: String,
  email: String,
  passwordHash: String,
  role: "student" | "tutor",
  createdAt: Date,
};

// Tutor Profile Schema (linked to User)
const TutorProfile = {
  userId: ObjectId, // FK to User
  subjects: [String],
  bio: String,
  hourlyRate: Number,
  location: String,
  profileSlug: String, // e.g. zanele-maths
  availability: [
    {
      day: "Monday",
      startTime: "14:00",
      endTime: "16:00"
    }
  ]
};

// Booking Schema
const Booking = {
  tutorId: ObjectId,
  studentId: ObjectId,
  subject: String,
  date: Date,
  timeSlot: {
    start: String,
    end: String
  },
  status: "pending" | "confirmed" | "cancelled"
};

/**
 * API ROUTES
 */

// Auth
POST /api/auth/register (role: student/tutor)
POST /api/auth/login

// Tutor Profile Management
GET /api/tutors [public browse]
GET /api/tutors/:slug [public profile view]
POST /api/tutors/profile [tutor creates/updates profile]

// Booking
GET /api/bookings/mine [student or tutor dashboard]
POST /api/bookings/create [student books tutor slot]
PATCH /api/bookings/:id/status [tutor confirms/cancels]

/**
 * FRONTEND ROUTES (VITE + REACT)
 */

// Public
/ -> homepage
/tutors -> tutor list
/tutors/:slug -> tutor profile

// Auth
/login
/register

// Dashboards
/student/dashboard -> bookings
/tutor/dashboard -> manage availability, bookings

/**
 * EXTRAS FOR SHOPIFY-STYLE UX
 */

// Dynamic Routing
// Each tutor gets a public profile with a clean URL
// e.g. /tutors/zanele-maths

// Shared Booking Component
// Used across all tutor profiles (same experience)

// Stripe Integration (Phase 2)
// Central checkout -> sends % to tutor

// Embeddable Widget (Future)
// <TutorBookingWidget tutorSlug="zanele-maths" />


/Site for Vercel:
https://111-g23n82r1k-viossixths-projects.vercel.app/