# Layout Patterns Reference

---

## Common Page Layouts

### Single Column (Content Focus)

```
[           Header / Nav            ]
[                                    ]
[     [ Content (max 640-768px) ]    ]
[                                    ]
[           Footer (optional)        ]
```

Use for: articles, blog posts, settings, forms, onboarding flows.
Max content width: 640-768px for reading, 480px for forms.

### Sidebar + Content

```
[    Nav Bar                         ]
[ Sidebar  |  Main Content           ]
[ 240-280px|  fluid                   ]
[          |                          ]
```

Use for: dashboards, admin panels, email clients, documentation.
Sidebar collapses to hamburger menu on mobile.

### Top Nav + Content Grid

```
[           Navigation Bar           ]
[                                    ]
[  [ Card ]  [ Card ]  [ Card ]      ]
[  [ Card ]  [ Card ]  [ Card ]      ]
[                                    ]
```

Use for: catalogs, galleries, team directories.
Cards use `minmax(300px, 1fr)` for responsive grid.

### Split Screen

```
[ Left Panel (40-50%) | Right Panel (50-60%) ]
[                      |                       ]
[                      |                       ]
```

Use for: auth pages, comparison views, editor + preview.
Stack vertically on mobile.

### Dashboard

```
[           Top Bar                  ]
[ Side |  [ Metric ] [ Metric ]      ]
[ Nav  |  [ Chart              ]     ]
[      |  [ Table              ]     ]
```

Use for: analytics, monitoring, CRM.
Dense layout with 4px spacing base.

---

## Grid Systems

### 12-Column Grid

Standard for desktop layouts. Divide content into spans:
- Full width: 12 cols
- Two thirds: 8 cols
- Half: 6 cols
- Third: 4 cols
- Quarter: 3 cols
- Sidebar: 3 cols + content: 9 cols

### Flexible Grid (CSS Grid)

```css
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
```

Better for card-based layouts that need to adapt dynamically.

### No Grid (Intentional)

Some layouts work better without a rigid grid:
- Hero sections with asymmetric composition
- Feature highlights alternating image/text sides
- Portfolio/showcase with variable sizing

---

## Responsive Patterns

### Stack (Mobile-First Default)

Horizontal layout becomes vertical:
```
Desktop: [A] [B] [C]
Mobile:  [A]
         [B]
         [C]
```

### Collapse (Sidebar)

```
Desktop: [Sidebar | Content]
Mobile:  [Hamburger] [Content]
         [Drawer overlay when open]
```

### Reflow (Cards)

```
Desktop: [1] [2] [3] [4]
Tablet:  [1] [2]
         [3] [4]
Mobile:  [1]
         [2]
         [3]
         [4]
```

### Priority (Hide Non-Essential)

```
Desktop: [Logo] [Nav Items] [Search] [Profile]
Mobile:  [Logo] [Hamburger] [Profile]
```

Search and nav items move into the hamburger menu.

---

## Breakpoint Strategy

| Breakpoint | Width | Approach |
|-----------|-------|----------|
| Mobile | < 768px | Single column, stacked, touch-friendly |
| Tablet | 768-1023px | Two columns, adapted navigation |
| Desktop | 1024-1439px | Full layout, sidebar visible |
| Wide | 1440px+ | Max-width container, centered |

Design mobile-first, enhance at each breakpoint.

---

## Common Layout Mistakes

1. **Full-width text**: Body text spanning 1440px → unreadable
2. **Fixed widths**: Content that doesn't adapt → broken on any non-target screen
3. **Hidden content on mobile**: Removing important features → accessibility issue
4. **Inconsistent gutters**: Different gaps between columns → visual noise
5. **No max-width**: Content stretching infinitely on wide screens
