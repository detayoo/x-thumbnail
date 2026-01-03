````markdown
# Editorial Design System – Typography & Component Specification

**Font:** ITC Avant Garde  
**Rule:** Font is constant; only **weight, size, line height, and tracking** vary.  
**All text elements are componentized.**

---

## 1. Typography Components

| Component          | Weight          | Size (Desktop / Mobile) | Line Height | Tracking | Use                                             |
| ------------------ | --------------- | ----------------------- | ----------- | -------- | ----------------------------------------------- |
| Headline (H1)      | Bold            | 64px / 36px             | 1.1         | Tight    | Article headline (once)                         |
| SectionHeader (H2) | Medium          | 32px / 24px             | 1.3         | Normal   | Section titles                                  |
| Paragraph          | Book / Regular  | 18px / 16px             | 1.6         | Normal   | Body copy                                       |
| MetaText           | Light           | 14px                    | 1.4         | Normal   | Author, date, reading time                      |
| PullQuote          | Italic / Medium | 28px / 22px             | 1.3         | Slight   | Sparse editorial emphasis                       |
| Caption            | Book / Regular  | 14px                    | 1.4         | Normal   | Figure captions, inline references              |
| DisruptionText     | Medium / Bold   | 36px / 28px             | 1.2         | Adjusted | Avant-Garde moment, singular editorial emphasis |

---

## 2. React Component Mapping

```tsx
// Headline
<Headline level={1}>{text}</Headline>

// Section header
<SectionHeader>{text}</SectionHeader>

// Paragraph
<Paragraph>{text}</Paragraph>

// Meta
<MetaText>{text}</MetaText>

// Pull quote
<PullQuote weight="italic">{text}</PullQuote>

// Figure caption
<Caption>{text}</Caption>

// Disruption / Avant-Garde moment
<DisruptionText weight="bold">{text}</DisruptionText>
```
````

> **All components are self-contained, responsive, and composable.** Layout, vertical rhythm, and container constraints are applied outside the components.

---

## 3. Layout & Spacing Tokens

| Token               | Desktop | Mobile | Notes                               |
| ------------------- | ------- | ------ | ----------------------------------- |
| Page margin         | 160px   | 16px   | Horizontal padding                  |
| Column width        | 720px   | 100%   | Centered text column                |
| Container max-width | 1440px  | 100%   | Centered page container for desktop |
| Vertical rhythm     | 48px    | 24px   | Between sections                    |
| Section padding     | 80px    | 32px   | Entry/closing sections              |
| PullQuote margin    | 120px   | 32px   | Sparse, never consecutive           |
| Disruption margin   | 160px   | 40px   | Avant-Garde moment spacing          |

> **Note:** All text sits inside a **max-width 1440px container** on desktop; content is centered within it.

---

## 4. Component Inventory & Behavior

| Component                | Behavior / Notes                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| EntryFrame               | Full viewport height (desktop), anchors low, optional media. Headline + subheading + meta.               |
| TransitionState          | Divider / whitespace buffer; purely spatial; no content logic.                                           |
| ReadingFlow              | Orchestrates Paragraph, SectionHeader, PullQuote, Figure. Vertical rhythm enforced.                      |
| MarginaliaRail (Desktop) | Anchored to scroll; never overlaps main text.                                                            |
| InlineReference (Mobile) | Expands inline; same content as MarginaliaRail.                                                          |
| DisruptionBlock          | Singular per article; temporarily alters column width or typography emphasis; resolves back immediately. |
| ClosingSection           | Editorial resolution; returns to strict column discipline.                                               |
| MetaFooter               | Minimal metadata; publication and year; no promotional elements.                                         |

---

## 5. Layout Principles

1. **Self-contained components** — no component assumes siblings.
2. Vertical rhythm drives pacing; spacing is deterministic.
3. Sparse editorial interjections (PullQuote, DisruptionText) are **earned**, never consecutive.
4. Typography is the **interface** — if type fails, the experience fails.
5. Optional features (Avant-Garde moment, media) are safe to remove.
6. **Container max-width 1440px** ensures content never stretches too wide; column remains centered.
7. Layout and vertical rhythm are applied **outside components**, ensuring deterministic rendering.

---

## 6. Usage Philosophy

- Only **one font**: ITC Avant Garde.
- Variation is limited to **weight, size, line height, tracking**.
- All **text is componentized**: Headline, SectionHeader, Paragraph, MetaText, PullQuote, Caption, DisruptionText.
- System is **predictable, modular, and responsive**.
- Typography and layout work together to enforce **clarity, authority, and rhythm**.
- **Desktop content lives inside the 1440px max-width container using the page-container component**; text columns are centered within it.

```
there are some basic layouts already done in this project, i will place them in the layout components for easy access.
based on what layout i say i want, i want the content that i will be generating at that time to fit into the layout i'm referencing.

```

---

## 7. Request New Category Modal – Typography Specification

**Design Rule:** All text in the modal is lowercase to maintain editorial consistency.

| Component           | Desktop Font Size | Mobile Font Size | Weight | Use                                    |
| ------------------- | ----------------- | ---------------- | ------ | -------------------------------------- |
| Modal Title         | 24px (text-2xl)   | 20px (text-xl)   | Medium | "request new category"                 |
| Modal Description   | 16px (text-base)  | 14px (text-sm)   | Normal | Main description text                  |
| Field Labels        | 14px (text-sm)    | 14px (text-sm)   | Medium | Input field labels                     |
| Field Descriptions  | 14px (text-sm)    | 14px (text-sm)   | Normal | Helper text below inputs               |
| Input Text          | 16px (text-base)  | 16px (text-base) | Normal | User input text                        |
| Input Placeholders  | 16px (text-base)  | 16px (text-base) | Normal | Placeholder text (lowercase)           |
| Textarea            | 16px (text-base)  | 16px (text-base) | Normal | Multi-line description input           |
| Button Text         | 14px (text-sm)    | 14px (text-sm)   | Medium | "cancel" and "send request" buttons    |

**Responsive Behavior:**
- Modal title scales from 20px (mobile) to 24px (desktop)
- Modal description scales from 14px (mobile) to 16px (desktop)
- All other text maintains consistent sizing across devices for optimal readability
- Input fields use 16px on mobile to prevent iOS auto-zoom behavior

**Typography Philosophy:**
- Lowercase text creates a friendly, approachable editorial tone
- Consistent font sizing ensures readability across all device sizes
- Medium weight for labels and interactive elements provides clear hierarchy
- Normal weight for body text maintains readability
