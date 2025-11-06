# Kutty Port Design Guidelines

## Design Approach
**Reference-Based Hybrid**: Drawing inspiration from modern logistics platforms (Flexport, Convoy) combined with startup SaaS aesthetics (Linear, Notion) to create a futuristic yet approachable export logistics experience for MSMEs.

**Design Principle**: "Think Local, Ship Global" - Professional enterprise capabilities with small business accessibility.

---

## Core Design Elements

### Typography
**Font Stack**: Poppins (primary), Inter (secondary), Roboto (fallback)
- **Headings**: Poppins Bold - Hero (text-5xl/text-6xl), Section (text-3xl/text-4xl), Subsection (text-2xl)
- **Body**: Inter Regular (text-base/text-lg), Medium for emphasis
- **UI Elements**: Inter Medium (buttons, labels), Poppins SemiBold (navigation)
- **Data/Numbers**: Roboto Mono for tracking numbers, metrics

### Color System
**Primary Palette**:
- Deep Blue (#003366): Primary brand, headers, CTA backgrounds, trust elements
- Aqua Green (#00C4B3): Accents, interactive states, success indicators, tracking progress
- White (#FFFFFF): Backgrounds, cards, clean space

**Functional Colors**:
- Success: Aqua Green variants
- Warning: Amber (#F59E0B)
- Error: Red (#EF4444)
- Neutral: Gray scale (50-900)

### Layout System
**Spacing Units**: Tailwind scale - 4, 8, 12, 16, 20, 24, 32 (consistent rhythm)
- **Section Padding**: py-20 (desktop), py-12 (mobile)
- **Card Padding**: p-6 to p-8
- **Component Gaps**: gap-4 (tight), gap-8 (standard), gap-12 (loose)

**Container Strategy**:
- Full-width sections with inner max-w-7xl
- Content sections: max-w-6xl
- Forms/Text: max-w-2xl

**Grid Patterns**:
- Service cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Feature sections: 2-column split (text + visual)
- Dashboard widgets: responsive grid with auto-fit

---

## Component Library

### Navigation
**Fixed Header** (all pages):
- Logo + "Think Local, Ship Global" slogan (left)
- Horizontal nav menu (center) - text-sm font-medium
- Login/Signup buttons (right) - Deep Blue bg, white text
- Height: h-20, shadow-sm on scroll

### Hero Sections
**Public Pages**:
- 2-column layout: 60% content (left) / 40% visual (right)
- Hero image: Animated 3D cargo flow visualization showing local→hub→port→global journey
- Headline hierarchy: Large Poppins Bold + supporting Inter Regular
- Dual CTAs: Primary (Aqua Green) + Secondary (Deep Blue outline)
- Height: min-h-[600px], not forced viewport

**Dashboard Heroes**:
- Compact welcome banner with user name + quick stats
- Height: h-48, gradient background (Deep Blue to lighter blue)

### Cards
**Standard Card Pattern**:
- Rounded corners: rounded-2xl (16px)
- Shadow: shadow-lg on hover, shadow-md default
- Padding: p-6
- Border: Optional subtle border (gray-100)
- Icon placement: Top-left or centered above title

**Service/Feature Cards** (6-card grid):
- Icon (Lucide) in Aqua Green circle background
- Title: text-xl Poppins SemiBold
- Description: text-sm Inter Regular
- Hover: Lift effect (transform scale-105), shadow increase

**Client/Testimonial Cards**:
- Photo: rounded-xl, w-24 h-24
- Name + designation overlay or adjacent
- Quote: text-base italic
- Grid: 3 columns desktop, carousel mobile

### Forms
**Input Fields**:
- Height: h-12
- Border: 2px border-gray-300, focus:border-Aqua
- Rounded: rounded-lg
- Padding: px-4
- Label: text-sm font-medium above input

**Buttons**:
- Primary: Deep Blue bg, white text, rounded-lg, px-6 py-3, hover:shadow-lg
- Secondary: Aqua Green bg, Deep Blue text
- Outline: border-2 Deep Blue, transparent bg
- On images: backdrop-blur-md bg-white/20

**Step Forms** (Booking Flow):
- Progress indicator: horizontal stepper with Aqua checkmarks
- Steps: Pickup → Package → Documents → Payment → Confirmation
- Each step: single card focus, next/back buttons bottom-right

### Data Display
**Tracking Timeline**:
- Vertical timeline with dot indicators
- Active step: Aqua Green, completed: Deep Blue, pending: gray
- Status text: Poppins Medium
- Timestamps: text-sm gray

**Widgets/Stats**:
- Large number: text-4xl Roboto Mono
- Label below: text-sm gray
- Icon accent: Lucide icon in Aqua
- Background: subtle gradient or solid card

**Tables** (Admin/Employee):
- Striped rows: alternate gray-50
- Header: Deep Blue bg, white text, sticky
- Actions: Aqua icon buttons right-aligned

### Maps & Visualizations
**Interactive Map** (Tracking):
- Full-width within section
- Height: h-96 minimum
- Overlay controls: top-right corner cards
- Markers: Custom pins (truck, hub, port icons)

**Hub Flow Diagram**:
- Horizontal flow: Customer → Local Hub → Regional Hub → Port → Export
- Connected with animated dotted lines (Aqua)
- Icons: Lucide at each node
- Labels: text-sm below

### Footer
**3-Column Layout**:
- Left: Logo + slogan + 2-sentence description
- Center: Quick links grid (2 columns)
- Right: Contact info + social icons (Lucide)
- Background: Deep Blue, white text
- Height: py-16

---

## Dashboard-Specific Patterns

### Sidebar Navigation
- Width: w-64 (desktop), collapsible mobile
- Background: Deep Blue
- Icons: Lucide, white with Aqua hover
- Active state: Aqua background strip + white text

### Dashboard Widgets
- 4-column responsive grid (1/2/3/4 columns based on viewport)
- Widget header: title + "View All" link
- Widget body: scrollable if needed, max-h-80
- Consistent card styling across all widgets

### AI Chatbot
- Fixed bottom-right corner
- Expandable chat window: w-96 h-[500px]
- Messages: alternating alignment (user right, bot left)
- Input: sticky bottom with send button (Aqua)

---

## Images

**Hero Section (Home)**: Large 3D animated illustration showing cargo journey - stylized isometric view of containers, trucks, ships moving through hubs. Modern, tech-forward aesthetic with glowing connections. Size: 600x500px minimum.

**About Page**: Team collaboration photo or logistics operations imagery showing diverse people working with technology. Professional, inclusive. 500x400px.

**Service Cards**: Icon-based (Lucide), no photos needed.

**Client Carousel**: Client company logos or representative photos with names. 150x150px circular frames.

**Hub Visualization**: Custom illustrated diagram showing the hub network flow - created as inline SVG or high-quality infographic. Full section width.

**Technology Page**: Modern server room or IoT sensor imagery, dashboard screenshots mockups. 700x500px.

**Contact Page**: Embedded Google Map (Coimbatore location) + office exterior photo optional. Map: h-96.

**Testimonials**: Customer headshots - professional, diverse. 80x80px circular.

---

## Animation & Interaction
- **Minimal animations**: Hover scale (1.02-1.05), shadow transitions
- **Hero**: Subtle cargo flow animation (moving dots along paths)
- **Page loads**: Fade-in only, no excessive motion
- **Form validation**: Shake animation on error, checkmark on success
- **Tracking updates**: Pulse effect on status changes

---

## Accessibility
- Minimum contrast ratio: 4.5:1 for text
- Focus states: 3px Aqua outline on all interactive elements
- Form labels: always visible, never placeholder-only
- Icon buttons: include aria-labels
- Keyboard navigation: full support across all dashboards

---

**Overall Tone**: Modern, trustworthy, tech-forward but approachable for small business users. Clean layouts with purposeful use of space, professional without being corporate-cold.