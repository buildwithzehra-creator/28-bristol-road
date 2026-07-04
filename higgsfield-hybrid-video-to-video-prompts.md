# 28 Bristol Road Hybrid Higgsfield Hero Prompts

## Purpose

This is the alternate hero-video workflow.

Use:

1. **Clip 01** as image-to-video because no exterior 360 exists.
2. **Clips 02-05** as video-to-video using clean Panoee 360 screen recordings as the motion/path reference.

The goal is to avoid the 2D slideshow effect while keeping the camera path believable and grounded in the actual 360 walkthrough.

## Best Workflow

### Clip 01

Use exterior render images as image references. Clip 01 ends outside at the main entry door / threshold. It does not enter the house.

### Clips 02-05

Use:

- A 360 screen recording as the **motion reference**.
- The final still renders as the **visual/detail references**.
- The specs below as the **correction rules**.

Record the Panoee 360 with:

- No visible UI if possible.
- No hotspots or labels visible if possible.
- If UI, dropdowns, room labels, navigation controls, or hotspot markers cannot be hidden, keep them as unobtrusive as possible and avoid moving the cursor over them.
- Slow movement.
- No fast mouse dragging.
- No abrupt spinning.
- No zooming in and out too aggressively.
- Camera path should feel like one smooth guided walkthrough.

Important: if the source recording contains Panoee interface elements, dropdowns, room-name lists, cursor movement, arrows, hotspots, navigation controls, loading messages, or room labels, Higgsfield must treat them as unwanted source artifacts. They are not part of the house and must be removed/ignored in the final video.

## Locked Creative Decisions

- Use a threshold match cut between Clip 01 and Clip 02.
- Clip 01 ends on the dark main entry door / front threshold.
- Clip 02 begins inside with a matching dark doorframe edge or shadow sliding away into the entry hall.
- Use a second threshold match cut between Clip 04 and Clip 05.
- Clip 04 ends approaching the primary bedroom door from the upstairs hallway.
- Clip 05 begins with the matching primary bedroom doorframe edge sliding past camera, then reveals the primary bedroom.
- The primary bathroom is not part of the current hero sequence because it is not available in the current 360/video reference.
- Do not use the exterior aerial callback in the main version. It can be tested later only if Clip 01's exterior image-to-video result is excellent and can be reversed cleanly.

## 360 Tour Route Reference

Panoee route:

`Entery Hall -> FamilyRoom -> Kitchen / brief Eating Area -> Living views -> Home Office -> Stairs Hall FirstFloor -> Upstairs Hallway -> Primary Bedroom -> Primary Sitting Area / Window View`

Use this route logic. Do not invent a different house path. The eating area may appear only as a very brief transitional glimpse in Clip 02, not a featured hero moment.

## Spec Rules To Preserve

### Interior Trim

- First floor foyer entrance, hallway, living room, and bedroom: **3-piece crown molding**.
- First floor main kitchen, second kitchen, pantry, mudroom: **1-piece crown molding**.
- First floor library and dining room: **2-piece crown molding**.
- Second floor hallway: **3-piece crown molding**.
- Second floor bedrooms: **1-piece crown molding**.
- First and second floor door/window casing: Metro casing, `MCC334PRF`, 1-1/8 x 3-3/4 primed pine casing.
- First floor baseboard: 2-piece 7 inch base with Metro base cap.
- Second floor baseboard: 7 inch SCOOP7 profile.
- Basement and attic: no basement window trim; attic has simpler trim.

### Stair / Hall

- Preserve staircase geometry from the render and 360.
- Preserve stair rail/profile, newel post, treads, nosing impression, white oak stair details, chandelier, and entry/stair hall proportions.
- Do not simplify the first-floor crown trim in the entry/hall/living areas.

### Kitchen

- Main kitchen cabinet construction: inset construction.
- Doors/lower drawers: 5-piece, 1 inch.
- Top drawer: slab, 1 inch.
- Perimeter paint: `SW 7011 Natural Choice`.
- Island: stained walnut.
- Panel-ready appliances where shown; keep dishwasher/fridge panel integration consistent.
- Keep center rails aligned where visible.

### Library / Office

- Library/home office built-ins: inset construction.
- Paint: `BM 1484 Ashwood Moss`.
- Preserve built-in layout, shelves, cabinets, panel proportions, and pocket-door/finished-interior impression where visible.

### Primary Bath - Future Only

- Master bath cabinet paint: `SW 7642 Pavestone`.
- Frameless construction.
- Preserve stone, tile, mirror, vanity, fixture layout, and bath/shower proportions from the render.
- Do not use the primary bath in the current hero sequence until a usable bathroom reference is available.

## Global Prompt Add-On For Video-To-Video Clips

Use this block for Clips 02-05:

```text
Use the uploaded 360 screen recording as the motion/path reference only.
Use the uploaded final render images and project specs as the visual truth.

Preserve the camera direction and route from the 360 video, but upgrade the output into a cinematic realistic FPV architectural walkthrough.
Remove all 360-tour UI, hotspots, labels, navigation controls, cursor movement, loading elements, text, and interface overlays.
If the recording contains Panoee dropdown menus, room selection lists, hotspot pins, navigation arrows, mini-map controls, share buttons, VR/fullscreen buttons, room counters, loading messages, or cursor movement, erase/ignore them completely. They are only recording artifacts.

Do not copy the low-resolution 360 texture quality. Replace it with the clean high-end render look from the provided final render references.

Maintain the actual spatial route from the 360 recording. Do not invent new connecting rooms, doors, hallways, landings, windows, furniture, or cabinetry.

Use subtle cinematic stabilization, foreground parallax, close architectural object passes, and soft motion blur only during occlusion wipes.
```

## Clip 01 - Exterior To Front Door

### Type

Image-to-video

### Format

`5 seconds / 4 shots / exterior FPV approach ending at front door`

### References

- `Exterior View 1.png`
- `Exterior View 2.png`
- `Exterior View 3.png`
- `Landscape Plan.pdf`
- `Plant Catalog.pdf`
- `Proposed Site Plan.pdf`

### Prompt

```text
FORMAT: 5 seconds / 4 shots / image-to-video cinematic FPV exterior approach ending at the front door.

USE @image_1 Exterior View 1.png, @image_2 Exterior View 2.png, @image_3 Exterior View 3.png as exact exterior visual anchors.

GOAL:
Create a realistic FPV arrival at 28 Bristol Road. The camera approaches the elevated exterior, moves through the front approach, passes close to landscape/stone/entry elements, and ends at the front door / entry threshold. This must not feel like a 2D image zoom. Do not go inside during this clip.

ENVIRONMENT:
Preserve the exterior facade, roofline, windows, stone, wood, entry door location, porch/entry proportions, driveway edge, front walkway, steps, retaining walls, elevated property grade, and all visible landscaping exactly as shown in the exterior render references and landscape/site plan references.

The property must read as an elevated Newton residential lot, not a flat suburban lawn. Keep the raised approach, retaining wall condition, stone steps/pathway, and entry landing relationship intact. Do not flatten the site grade or lower the house into the landscape.

Vegetation must stay consistent with the landscape references and plant catalog. Use the same New England planting character and species palette where visible: Japanese maple / Bloodgood maple character, maples, birch, boxwood, feather reed grass, hornbeam, redbud, dogwood, hakone grass, hosta, hydrangea, Japanese holly, juniper, liriope, catmint, fountain grass, rhododendron, roses, spirea, stewartia, lilac, arborvitae, viburnum, oak, and other listed catalog plants only where appropriate to the render. Preserve plant placement, density, scale, and layered planting beds from the render references.

The clip must end at the exterior side of the dark main entry door or entry threshold. This ending frame should be composed so Clip 02 can begin inside the entry hall with a sleek match cut. The dark door/threshold should fill enough of the frame to hide the cut.

SHOT 1 - 0:00 to 0:01:
Start outside with a composed exterior view. Camera floats forward slowly toward the elevated property.

SHOT 2 - 0:01 to 0:02:
Approach through the front landscape and hardscape. Use plantings, stone, retaining wall edge, pathway edge, or porch/entry element as close foreground parallax.

SHOT 3 - 0:02 to 0:04:
Use a close foreground pass from landscape, stone, retaining wall edge, front door edge, or porch/entry element to create a refined cinematic wipe. Do not reveal the interior yet.

SHOT 4 - 0:04 to 0:05:
Settle at the main entry door / threshold. End on a clean, stable, slightly darkened frame where the dark front door, wood edge, stone edge, or shadowed threshold fills most of the frame. This is the exact match-cut handoff into Clip 02.

NEGATIVE PROMPT:
No interior reveal in this clip, no passing fully through the door, no showing the entry hall yet, no flat lawn, no tropical plants, no palm trees, no desert plants, no random vegetation, no generic hedge replacement, no moving/removing retaining walls, no removing stone steps/pathway, no changing elevated grade, no changed facade, no wrong front entry, no extra windows, no people, no cars, no signage, no text, no logos, no distorted roof, no warped entry, no fake luxury mansion door, no wrong door color/material, no cheesy portal effect, no bright flash transition, no swirl, no glitch, no liquid morph, no slideshow zoom.
```

## Transition Between Clip 01 And Clip 02

Use a minimal high-end match cut, not a flashy effect.

```text
Use the final front-door / threshold frame from Clip 01 as a dark architectural occlusion wipe.
Clip 01 ends with the dark main entry door, wood edge, stone edge, or shadowed threshold filling most of the frame.
Clip 02 begins inside the entry hall with a matching dark doorframe edge, door shadow, or threshold shadow sliding away to reveal the staircase and chandelier.
The transition should feel like crossing the threshold, not like a magic portal.
No flash, no swirl, no liquid morph, no glitch, no lens warp, no cheesy zoom tunnel, no visible jump cut.
```

## Clip 02 - Entry Hall, Family Kitchen, And Eating Area

### Type

Video-to-video

### Motion Reference To Record

Record from Panoee:

`Entery Hall -> FamilyRoom -> Kitchen / brief Eating Area`

Include the eating area only as a fast transitional glimpse if it appears naturally in the recording. Do not make it a featured stop.

### Format

`5 seconds / video-to-video cinematic FPV entry and kitchen sequence`

### Visual References

- `Entery Hall.png`
- `FamilyRoom&Kitchen.png`
- `Family Room.png`
- `Kitchen.png`

### Prompt

```text
FORMAT: 5 seconds / video-to-video cinematic FPV entry, family kitchen, and brief eating-area reveal.

Use the uploaded 360 screen recording as the camera path and movement reference.
Use Entery Hall.png, FamilyRoom&Kitchen.png, Family Room.png, and Kitchen.png as visual/detail references. Use Eating Area only if it appears briefly in the reference recording.

GOAL:
Transform the 360 walkthrough recording into a cinematic FPV architectural hero clip. Keep the actual route from entry hall into the family room / kitchen zone, with the eating area only as a quick passing glimpse if visible. Remove the 360-tour UI and upgrade the look to final-render quality.

ENVIRONMENT:
Preserve the entry hall exactly: staircase geometry, stair rail/profile, newel post, stair treads, stair nosing impression, chandelier, white oak stair details, wall color, casing, baseboard, and first-floor 3-piece crown trim.

Preserve first-floor trim rules: foyer entrance, hallway, living room, and bedroom areas need 3-piece crown molding; kitchen area needs 1-piece crown molding; library/home office needs 2-piece crown molding. Keep Metro door/window casing and 2-piece 7 inch baseboard with base cap where visible.

Preserve the family room and kitchen exactly from the render references: same sofa/chair shapes, same pillows, same pillow colors and placement, same tables, same decor, same fireplace/wall composition where visible, same cabinetry, same kitchen island, same backsplash/countertop appearance, same lighting, same windows, same arch/opening shapes, and same room relationships.

Preserve kitchen specs: inset construction, 5-piece 1 inch doors/lower drawers, 1 inch slab top drawers, SW 7011 Natural Choice perimeter cabinetry, stained walnut island, panel-ready appliance integration where visible.

CAMERA / TRANSITION:
Start inside the entry hall as if Clip 01 has just crossed the front threshold. The first frame should include a matching dark doorframe edge, door shadow, or threshold shadow sliding away, revealing the staircase and chandelier. Keep the motion path from the 360 recording but make it feel like stabilized cinematic FPV. Use stair rail, chandelier, white oak arch, wall edge, cabinet face, countertop edge, pillow/sofa edge, or door frame as close foreground occlusion wipes.

NEGATIVE PROMPT:
No visible Panoee UI, no dropdown menus, no room selection list, no hotspots, no labels, no arrows, no mouse cursor, no interface text, no navigation controls, no eating area as a featured stop, no office reveal in this clip, no invented hallways, no changed route, no impossible room layout, no added furniture, no removed furniture, no changed pillows, no swapped pillow colors, no moved pillows, no changed cabinetry, no changed cabinet color, no changed walnut island, no altered countertop/backsplash, no visible non-panel-ready appliances if panel-ready in render, no warped arch, no full round arch where squared softened arch is shown, no duplicated chandelier, no changed stair rail, no changed newel post, no simplified/missing crown trim, no wrong trim by room, no people, no logos, no slideshow pan.
```

## Clip 03 - Living View And Office

### Type

Video-to-video

### Motion Reference To Record

Record from Panoee:

`Living view -> Home Office`

### Format

`5 seconds / video-to-video cinematic living and office sequence`

### Visual References

- `Living.png`
- `Living View.png`
- `Home Office.png`

### Prompt

```text
FORMAT: 5 seconds / video-to-video cinematic FPV living view and office reveal.

Use the uploaded 360 living-view and office recording as the camera path and movement reference.
Use Living.png, Living View.png, and Home Office.png as visual/detail references.

GOAL:
Transform the 360 living and office recording into a polished cinematic interior moment. The clip should feel warmer and more emotional than the kitchen clip: reveal the living view, sofa/pillow/arch/window details, then move toward or briefly reveal the home office.

ENVIRONMENT:
Preserve the living room exactly from the render references: sofa shape, pillow colors and placement, chair placement, side tables, artwork, plants, fireplace/wall composition where visible, white window frames, wall color, oak arch/opening shape, flooring direction, lighting, and room proportions.

Preserve the home office/library exactly from the reference: BM 1484 Ashwood Moss built-ins, inset construction, same shelves, cabinets, wall color, furniture placement, window/trim layout, and opening/door relationship.

Respect trim rules: first-floor living areas need 3-piece crown molding; library/home office needs 2-piece crown molding. Keep Metro casing and first-floor 2-piece 7 inch baseboard where visible.

CAMERA / TRANSITION:
Use the actual 360 camera path as the base. Add cinematic stabilization and FPV depth. Use sofa edge, pillow foreground, chair back, wall edge, white oak arch, door casing, built-in cabinet edge, or plant leaves as close foreground occlusion wipes. Keep the movement calm and expensive, not fast.

NEGATIVE PROMPT:
No visible Panoee UI, no hotspots, no labels, no cursor, no changed sofa, no changed pillows, no swapped pillow colors, no missing sitting area, no changed white oak arch, no full round arch where squared softened arch is shown, no changed office built-ins, no changed office color, no invented furniture, no extra doors, no wrong window layout, no simplified/missing crown trim, no wrong trim by room, no people, no text, no flickering walls, no aggressive drone spin, no fisheye distortion, no slideshow zoom.
```

## Clip 04 - Stairs And Upstairs Hallway To Primary Bedroom Door

### Type

Video-to-video

### Motion Reference To Record

Record from Panoee:

`Living / Entry stair direction -> Stairs Hall FirstFloor -> Upstairs Hallway -> Primary Bedroom door`

### Format

`5 seconds / video-to-video stair and upstairs hallway transition`

### Visual References

- `Entery Hall.png`
- `Stairs Hall FirstFloor.png`
- `Hallway.png`
- `Corridor1.png`
- `Primary Bedroom door / upstairs hallway reference from 360 recording`

### Prompt

```text
FORMAT: 5 seconds / video-to-video cinematic FPV stair ascent ending at the primary bedroom door.

Use the uploaded 360 stairs and upstairs hallway recording as the camera path and movement reference.
Use Entery Hall.png, Stairs Hall FirstFloor.png, Hallway.png, Corridor1.png, and the 360 frame of the primary bedroom door as visual/detail references.

GOAL:
Transform the 360 stair and hallway movement into a cinematic transition from the main level to the private level. The clip should end approaching the primary bedroom door so Clip 05 can begin with a matching doorframe threshold reveal into the bedroom.

ENVIRONMENT:
Preserve the exact stair and hallway condition: stair geometry, rail/profile, newel post, treads, nosing impression, chandelier, white oak stair details, walls, flooring, door/window casing, baseboards, hallway proportions, corridor lighting, and second-floor hallway crown trim.

Respect trim rules: first-floor foyer/hall/living areas need 3-piece crown molding; second-floor hallway also needs 3-piece crown molding; second-floor bedrooms visible off the hall should have 1-piece crown molding. Keep 7 inch baseboard profile and Metro casing where visible.

The camera route must follow the 360 recording: living/entry stair direction -> Stairs Hall FirstFloor -> upstairs hallway -> primary bedroom door. The transition can be beautified, but the spatial order cannot change.

The final frame should be close to the primary bedroom door, with the door, door casing, shadowed threshold, or dark handle/edge filling enough of the frame to hide the cut into Clip 05.

CAMERA / TRANSITION:
Use the actual 360 camera path as the base. Add cinematic stabilization and FPV depth. Hide cuts with close passes behind stair rail, newel post, chandelier globe, wall edge, door casing, hallway corner, or the primary bedroom door edge.

End with a clean architectural threshold match-cut setup. The camera approaches the primary bedroom door and settles close enough that Clip 05 can start as if passing through the same door.

NEGATIVE PROMPT:
No visible Panoee UI, no hotspots, no labels, no cursor, no room preview cards, no Master Bedroom label visible in the final frame, no spiral staircase, no changed railing, no changed rail profile, no changed newel post, no warped steps, no floating/twisting treads, no impossible landing, no invented mezzanine, no extra doors, no wrong hallway proportions, no missing chandelier where visible, no changed white oak details, no simplified first-floor or second-floor 3-piece crown trim, no wrong trim by room, no people, no text, no flickering walls, no aggressive drone spin, no fisheye stair distortion, no slideshow zoom.
```

## Transition Between Clip 04 And Clip 05

Use a minimal architectural threshold match cut, not a flashy effect.

```text
Use the final primary-bedroom-door frame from Clip 04 as an architectural occlusion wipe.
Clip 04 ends with the primary bedroom door, door casing, door edge, handle, or shadowed threshold filling enough of the frame to hide the cut.
Clip 05 begins with a matching doorframe edge, door shadow, or threshold shadow sliding past camera, revealing the primary bedroom.
The transition should feel like one continuous high-end real estate walkthrough entering the private suite.
No flash, no swirl, no liquid morph, no glitch, no lens warp, no cheesy zoom tunnel, no visible jump cut.
```

## Clip 05 - Primary Bedroom Reveal

### Type

Video-to-video

### Motion Reference To Record

Record from Panoee:

`Primary Bedroom door -> Master Bedroom -> Master Bed View 2 -> sitting area / sofa / window view`

Do not include the primary bathroom in this clip because it is not currently available.

### Format

`5 seconds / video-to-video primary bedroom finale`

### Visual References

- `Master Bedroom.png`
- `Master Bedroom View 2.png`
- `Primary bedroom sitting area / sofa / window reference from 360 recording`

### Prompt

```text
FORMAT: 5 seconds / video-to-video cinematic FPV primary bedroom finale.

Use the uploaded 360 primary bedroom recording as the camera path and movement reference.
Use Master Bedroom.png, Master Bedroom View 2.png, and the 360 frames of the bedroom sitting area / sofa / window view as visual/detail references.

GOAL:
Transform the 360 primary bedroom recording into a polished cinematic finale. Begin as if passing through the primary bedroom door from Clip 04. Reveal the bed area, then the sofa / sitting area and windows. End on a calm, soft, premium bedroom frame with window light, sofa, bedding, artwork, trim, or wood floor detail. Do not enter or invent the primary bathroom.

ENVIRONMENT:
Preserve the primary bedroom exactly as shown: bed placement, bedding, pillows, seating/detail area, sofa, windows, window frames, wall color, millwork/cabinetry where visible, casing, baseboard, flooring, lighting, artwork/decor if visible, and room proportions.

Respect trim rules: second-floor bedrooms use 1-piece crown molding; second-floor hallway uses 3-piece crown molding. Do not apply first-floor trim everywhere.

Preserve master bedroom millwork and bench/cabinet details only where visible in the render or 360 reference. Do not invent missing built-ins.

The primary bathroom is unavailable for the current hero sequence. The clip should stay inside the bedroom and sitting area only.

CAMERA / TRANSITION:
Begin with a matching primary bedroom doorframe edge or threshold shadow sliding past camera, as if Clip 04 has just entered the room. Use the actual 360 route as the path reference. Upgrade it into a clean cinematic FPV sequence.

Move slowly and smoothly from the door into the primary bedroom. Reveal the bed area first, then drift toward the sitting area, sofa, windows, or soft bedroom detail. Use bed fabric, sofa edge, chair back, wall edge, art edge, door frame, window trim, or curtain/window edge as close foreground occlusion wipes.

End on a stable, serene bedroom frame: sofa/sitting area, window-lit wall, bed fabric, artwork, trim, oak floor, or soft daylight. The ending should feel quiet and premium, like a soft visual exhale before the website scrolls into the interactive 360 section.

NEGATIVE PROMPT:
No visible Panoee UI, no dropdown menus, no room selection list, no hotspots, no labels, no arrows, no cursor, no room preview cards, no bathroom, no fake tub, no shower, no vanity, no tile wall, no invented spa scene, no added fireplace unless visible in exact reference, no changed bed placement, no changed bedding, no changed pillows, no moved sofa, no moved sitting area, no invented bench/cabinet details, no changed window layout, no altered millwork, no invented hallway, no extra mirrors, no people, no text, no logo, no exterior aerial callback in this main version, no leaving through bedroom window, no cheesy window portal, no unrealistic blast through glass, no drone crash movement, no slideshow pan.
```

## Future Optional Experiment

If Clip 01's exterior image-to-video result is excellent, we can test a separate optional callback later:

```text
Reverse or echo the successful exterior approach clip to create a final exterior pullback.
Only use this if the exterior clip looks clean, architectural, and believable.
Do not include this in the main hero generation until tested.
```

## Missing Inputs / Questions Before Generating

Before generating final Higgsfield clips, confirm these:

1. Will your 360 recording show Panoee dropdowns, room list, hotspots, or cursor movement? If yes, keep them as still and minimal as possible.
2. Confirm Clip 04 ends close enough to the primary bedroom door for the threshold match cut.
3. Confirm Clip 05 starts inside or just through the primary bedroom door, then shows the bed, sitting area/sofa, and windows within five seconds.
4. If we later test the exterior callback, use the successful Clip 01 result as the source and reverse/echo it rather than generating a new exterior from scratch.
