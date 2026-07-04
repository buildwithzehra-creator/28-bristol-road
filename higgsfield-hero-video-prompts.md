# 28 Bristol Road Higgsfield Hero Video Prompts

> Current approved workflow: use `higgsfield-hybrid-video-to-video-prompts.md`.
> This file is the earlier four-clip concept and is kept as archive reference only. It still contains the older bathroom finale and longer timing structure.

## Creative Direction

Create a cinematic 3D FPV / drone-style architectural walkthrough illusion for the website hero.

This must not feel like a slideshow, Ken Burns zoom, or simple 2D image pan. The camera should feel physically present in the house: moving through space, passing close to foreground objects, using parallax, motion blur, and object-wipe transitions.

The source renderings are 2D visual anchors. The 360 walkthrough defines the route logic. The videos should create the illusion of spatial movement while preserving the exact architecture and materials shown in the references.

## Recommended Delivery

Generate **4 separate MP4 clips**, not one long video.

The website will use:

1. `hero-01-exterior-to-entry.mp4`
2. `hero-02-entry-ground-floor-office.mp4`
3. `hero-03-stairs-upstairs.mp4`
4. `hero-04-primary-suite-bath.mp4`
5. Final scroll moves into the existing website / 360 walkthrough section.

Separate clips are better for scroll-snap because each scroll can play one self-contained cinematic move and land cleanly on a still frame.

## Verified Spatial Route

Use the Panoee 360 walkthrough route as the spatial logic:

`Entery Hall -> FamilyRoom -> Kitchen -> Eating Area -> Living views -> Home Office -> Stairs Hall FirstFloor -> Master Bedroom -> Master Bed View 2 -> Master Bathroom`

Do not invent a different route.

## Source Render References

### Exterior Folder: `EXTERIORS(3)`

- `Exterior View 1.png`
- `Exterior View 2.png`
- `Exterior View 3.png`

### Interior Folder: `INTERIORS(9)`

- `Entery Hall.png`
- `Living.png`
- `FamilyRoom&Kitchen.png`
- `Family Room.png`
- `Kitchen.png`
- `Master Bedroom.png`
- `Master Bedroom View 2.png`
- `Master Bath.png`

### Supplemental 360 References

- `Home Office.png`
- `Stairs Hall FirstFloor.png`
- `Hallway.png`
- `Corridor1.png`
- `Master Bathroom.png`

## Global Prompt Rules For Every Clip

Use these rules in every Higgsfield prompt:

```text
This is not a slideshow, not a Ken Burns image zoom, and not a static real-estate pan.
Create a realistic cinematic FPV / drone-style architectural walkthrough illusion.
The camera must feel physically present in the space, with foreground parallax, close object passes, soft motion blur during transitions, and architectural occlusion wipes.

Use the reference renders as exact visual anchors.
Preserve the architecture, furniture, trim, stair geometry, windows, cabinetry, doors, flowers, fixtures, lighting, materials, and room proportions exactly as shown.

When transitioning between spaces, hide the cut using an object passing close to camera: landscaping, flowers, porch column, front door, stair rail, newel post, chandelier, wall edge, white oak arch, cabinet face, countertop edge, door frame, bed fabric, mirror edge, or bathroom wall.

Do not invent visible connecting spaces.
Do not redesign the house.
Do not add people, pets, cars, text, captions, logos, signs, extra doors, extra windows, new furniture, new artwork, or seasonal decor.
Keep vertical lines straight. No fisheye distortion. No warped geometry. No melting furniture. No flickering materials.
```

## Clip 01 - Exterior To Entry Hall

### Format

`8 seconds / 4 shots / cinematic FPV exterior-to-entry transition`

### References

- `Exterior View 1.png`
- `Exterior View 2.png`
- `Exterior View 3.png`
- `Entery Hall.png`

### Prompt

```text
FORMAT: 8 seconds / 4 shots / cinematic FPV exterior-to-entry transition for a luxury residential website hero.

USE @image_1 Exterior View 1.png, @image_2 Exterior View 2.png, @image_3 Exterior View 3.png as the exact exterior visual anchors.
USE @image_4 Entery Hall.png as the exact interior landing frame.

GOAL:
Create the feeling of arriving at 28 Bristol Road, flying toward the front entry, then passing through the doorway into the entry hall. This must feel like a 3D drone / FPV walkthrough, not a 2D zoom.

ENVIRONMENT:
Preserve the exterior facade, roofline, windows, stone, wood, entry door location, porch/entry proportions, driveway edge, front walkway, steps, retaining walls, elevated property grade, and all visible landscaping exactly as shown in the exterior render references and landscape/site plan references.

The property must read as an elevated Newton residential lot, not a flat suburban lawn. Keep the raised approach, retaining wall condition, stone steps/pathway, and entry landing relationship intact. Do not flatten the site grade or lower the house into the landscape.

Vegetation must stay consistent with the landscape references and plant catalog. Use the same New England planting character and species palette where visible: Japanese maple / Bloodgood maple character, maples, birch, boxwood, feather reed grass, hornbeam, redbud, dogwood, hakone grass, hosta, hydrangea, Japanese holly, juniper, liriope, catmint, fountain grass, rhododendron, roses, spirea, stewartia, lilac, arborvitae, viburnum, oak, and other listed catalog plants only where appropriate to the render. Preserve plant placement, density, scale, and layered planting beds from the render references.

Preserve the entry hall, staircase, chandelier, flooring, stair rail/profile, newel post shape, white oak stair details, wall color, casing, and first-floor triple-crown trim exactly from the entry hall reference once the camera transitions inside. The first-floor trim should read as layered/multi-piece crown, not a simple flat crown.

MOOD:
Private cinematic arrival, refined, quiet, immersive, premium.

CAMERA LANGUAGE:
Low-speed FPV drone movement, smooth forward glide, foreground parallax, close passes near landscaping and the front entry, natural motion blur only during transition wipes, straight architectural verticals.

SHOT 1 — 0:00 to 0:02:
Begin outside on a composed wide exterior view. Camera floats forward slowly toward the house. Landscaping and facade depth create real parallax.

SHOT 2 — 0:02 to 0:04:
Camera moves closer to the front approach. Pass very close to a foreground planting, flower, stone edge, or porch-side architectural element. Use this foreground object to partially obscure the frame.

SHOT 3 — 0:04 to 0:06:
Use the close foreground wipe to hide the transition through the front door. The frame briefly fills with dark door/wood/stone edge motion blur, then opens into the entry hall.

SHOT 4 — 0:06 to 0:08:
Land inside Entery Hall. Camera eases forward slightly toward the staircase and chandelier, then settles on a stable frame.

ENDING FRAME:
Stable entry hall frame with staircase/chandelier visible, ready for the next scroll.

NEGATIVE PROMPT:
No people, no cars, no signs, no text, no logos, no fake door, no changed facade, no changed roofline, no extra windows, no altered entry proportions, no changed driveway/entry path, no flattened site grade, no removing or relocating retaining walls, no removing stone steps/pathway, no changing the elevated property condition, no generic lawn replacement, no tropical plants, no palm trees, no desert plants, no random ornamental trees, no invented hedges, no oversized flowers, no wrong vegetation species, no changing plant density or bed layout, no fake garden style that is not in the landscape references, no altered porch/entry geometry, no thick black sidelights if visible, no wrong front door style, no warped roofline, no distorted stairs, no changed stair rail, no simplified crown trim, no missing triple-crown trim, no extra exterior structures, no invented visible hallway, no slideshow zoom.
```

## Clip 02 - Entry Hall, Family Room, Kitchen, Office

### Format

`9 seconds / 5 shots / cinematic FPV ground-floor reveal`

### References

- `Entery Hall.png`
- `FamilyRoom&Kitchen.png`
- `Family Room.png`
- `Kitchen.png`
- `Home Office.png`

### Prompt

```text
FORMAT: 9 seconds / 5 shots / cinematic FPV ground-floor reveal for a luxury residential website hero.

USE @image_1 Entery Hall.png as the opening anchor.
USE @image_2 FamilyRoom&Kitchen.png, @image_3 Family Room.png, @image_4 Kitchen.png as the open living/kitchen anchors.
USE @image_5 Home Office.png as the office/library glimpse.

GOAL:
Create a dynamic interior drone-walkthrough illusion from the entry hall into the ground-floor living spaces, briefly revealing family room, kitchen, and home office, then orienting back toward the stair/entry direction.

ENVIRONMENT:
Preserve the exact entry hall, staircase, chandelier, white oak details, stair rail/profile, newel post, stair treads, stair nosing impression, squared arch forms with softened/rounded edges, flooring, wall color, window frames, casing, baseboard, and first-floor triple-crown trim from the references. The entry hall and family/kitchen areas must keep the layered crown trim and casing proportions; do not simplify the trim into a single flat crown.

Preserve the family room and kitchen exactly from the render references: same sofa/chair shapes, same pillows, same pillow colors and placement, same tables, same decor, same cabinetry color, same kitchen island shape/material, same backsplash/countertop appearance, same appliance-panel integration where visible, same lighting, same fireplace/wall composition where visible, and same relationship between kitchen, family room, and openings.

Preserve the home office/library exactly from the reference: same built-ins, shelving/cabinet proportions, wall color, desk/furniture placement, lighting, window/trim layout, and door/opening relationship. The office is a brief glimpse, not an invented new room.

MOOD:
Elegant private tour with kinetic transitions. Architectural, not flashy. Smooth but alive.

CAMERA LANGUAGE:
FPV interior glide, close object passes, doorway/arch/cabinet wipes, foreground parallax, soft motion blur on transitions only, no fast spinning.

SHOT 1 — 0:00 to 0:02:
Start in Entery Hall. Camera glides forward under/near the chandelier and subtly passes near the stair rail or newel post. The stair rail creates foreground parallax.

SHOT 2 — 0:02 to 0:04:
Use a white oak arch edge, wall edge, or stair rail passing close to camera as an occlusion wipe. Reveal the FamilyRoom&Kitchen view. The camera should feel like it moved into the open ground-floor space.

SHOT 3 — 0:04 to 0:06:
Glide through the family/kitchen area with a low, smooth FPV move. Pass close to a chair edge, countertop, cabinet face, or kitchen island edge so the room feels dimensional.

SHOT 4 — 0:06 to 0:07.5:
Use the cabinet/doorframe/wall edge as a hidden cut into the Home Office reference. Briefly reveal the home office/library with a gentle lateral move.

SHOT 5 — 0:07.5 to 0:09:
Use another doorway or wall-edge wipe to orient back toward the entry/stair direction. End stable, as if the viewer is ready to go upstairs.

ENDING FRAME:
Stable view near entry/stair direction, no text, no UI, no fade to black.

NEGATIVE PROMPT:
No invented hallways, no impossible room layout, no added furniture, no removed furniture, no changed sofa/chair shapes, no changed pillows, no swapped pillow colors, no moving pillows around, no new decor, no changed kitchen cabinets, no changed cabinet color, no changed island, no altered countertop/backsplash, no visible non-panel-ready appliances if hidden in the render, no wrong hood design, no warped arch, no rounded full arch where the render shows squared arch with softened edges, no duplicated chandelier, no warped stair rail, no changed newel post, no simplified trim, no missing triple-crown trim, no changed window frames, no changed office built-ins, no people, no text, no logos, no slideshow pan.
```

## Clip 03 - Entry Hall To Upstairs

### Format

`8 seconds / 4 shots / cinematic stair ascent`

### References

- `Entery Hall.png`
- `Stairs Hall FirstFloor.png`
- `Hallway.png`
- `Corridor1.png`

### Prompt

```text
FORMAT: 8 seconds / 4 shots / cinematic FPV stair ascent from entry hall to upstairs private level.

USE @image_1 Entery Hall.png as the ground-floor stair anchor.
USE @image_2 Stairs Hall FirstFloor.png as the stair transition anchor.
USE @image_3 Hallway.png and @image_4 Corridor1.png as the upstairs landing / corridor anchors.

GOAL:
Create the feeling of returning to the entry hall, rising up the stairs, and arriving on the upper level. This should feel like a real drone/walkthrough movement, not a static stair image zoom.

ENVIRONMENT:
Preserve the entry/stair hall and upper transition exactly as shown: staircase geometry, stair rail/profile, newel post, stair treads, stair nosing impression, chandelier, white oak details, walls, casing, baseboard, first-floor triple-crown trim at the lower level, upper-floor simpler crown/trim condition where visible, hallway proportions, corridor lighting, window/door casing, and flooring.

The stair ascent must respect the real house logic from the 360 tour: Entery Hall -> Stairs Hall FirstFloor -> Hallway/Corridor. The camera may hide transitions with stair rail, newel post, chandelier, or wall-edge occlusion, but it must not show invented intermediate landings or impossible stair geometry.

MOOD:
Smooth vertical transition from public entertaining level to private bedroom level. Calm but kinetic.

CAMERA LANGUAGE:
Slow FPV rise, close pass along stair rail/newel post/chandelier, upward parallax, object-wipe hidden cuts, straight architectural verticals.

SHOT 1 — 0:00 to 0:02:
Begin near the entry/stair hall. Camera turns gently toward the staircase. The newel post or stair rail passes close to lens.

SHOT 2 — 0:02 to 0:04:
Camera rises up the stairs as if floating. Keep stair geometry exact. Use the rail and treads as strong foreground parallax.

SHOT 3 — 0:04 to 0:06:
Pass close behind a stair rail, newel post, chandelier globe, or wall edge. Use that object to hide the transition to the upper stair hall / hallway.

SHOT 4 — 0:06 to 0:08:
Arrive upstairs in the hallway/corridor. Slow settle forward. The landing should feel quiet and real, not newly invented.

ENDING FRAME:
Stable upstairs hallway/corridor frame that can transition into the primary suite.

NEGATIVE PROMPT:
No spiral staircase, no altered railing, no changed rail profile, no changed newel post, no warped steps, no floating/twisting treads, no impossible landing, no invented mezzanine, no extra doors, no wrong hallway proportions, no missing chandelier where visible, no changed white oak details, no simplified first-floor triple-crown trim, no wrong upper-floor trim, no people, no text, no changed wall color, no flickering walls, no aggressive drone spin, no fisheye stair distortion, no slideshow zoom.
```

## Clip 04 - Primary Suite, Bath, Final Zoom-Out

### Format

`9 seconds / 5 shots / cinematic primary suite finale`

### References

- `Master Bedroom.png`
- `Master Bedroom View 2.png`
- `Master Bath.png`
- Optional backup: `Master Bathroom.png`

### Prompt

```text
FORMAT: 9 seconds / 5 shots / cinematic FPV primary suite and bath finale for a luxury residential website hero.

USE @image_1 Master Bedroom.png as the primary bedroom anchor.
USE @image_2 Master Bedroom View 2.png as the second bedroom/sitting/detail anchor.
USE @image_3 Master Bath.png as the primary bath anchor.
OPTIONAL backup reference: Master Bathroom.png.

GOAL:
Create a private, cinematic primary suite reveal. Move through the bedroom, pass near foreground furnishings or fabric, transition into the bath through a door/wall/mirror-edge wipe, then end with a quiet final zoom-out or backward drift.

ENVIRONMENT:
Preserve the primary bedroom exactly as shown in the references: same bed placement, bedding, pillows, seating/detail area, windows, window frames, wall color, millwork/cabinetry, casing, baseboard, flooring, lighting, artwork/decor if visible, and room proportions. Do not add a fireplace unless it is visible in the exact provided reference frame.

Preserve the transition into the bath as an occlusion-based cinematic cut rather than a visible invented hallway. Preserve the primary bath exactly as shown: same stone/slab appearance, vanity, mirror, fixtures, tile, glass, bath/shower layout, body-spray/fixture impression where visible, lighting, wall color, and proportions. The bathroom should feel spa-like but must not redesign any fixture, stone, mirror, tile stripe, or vanity detail.

MOOD:
Soft, private, spa-like, premium finale. More restrained than the ground-floor clips, but still spatial and cinematic.

CAMERA LANGUAGE:
Slow FPV glide, close pass by bed fabric/window edge/door frame, bathroom reveal through occlusion wipe, subtle backward drift at the end, no fisheye.

SHOT 1 — 0:00 to 0:02:
Start in Master Bedroom. Camera glides slowly forward, low and smooth, with bed/furniture/window depth creating parallax.

SHOT 2 — 0:02 to 0:04:
Use bed edge, fabric, chair edge, or wall edge passing very close to camera as a soft occlusion wipe. Reveal Master Bedroom View 2 / sitting-detail angle.

SHOT 3 — 0:04 to 0:06:
Glide toward the bathroom transition. Use a doorway, wall edge, or mirror-edge wipe to hide the cut into Master Bath.

SHOT 4 — 0:06 to 0:08:
Reveal Master Bath. Camera moves slowly through the bathroom, passing near vanity, stone edge, glass, mirror, or fixture for foreground parallax.

SHOT 5 — 0:08 to 0:09:
End with a subtle backward drift / zoom-out. The motion should feel like the cinematic tour is concluding and the website is ready to scroll into the interactive 360 walkthrough.

ENDING FRAME:
Stable, quiet, premium frame. No fade to black unless Higgsfield requires it. No text.

NEGATIVE PROMPT:
No added fireplace unless visible in the exact reference, no changed bed placement, no changed bedding, no changed pillows, no moving furniture, no added bench/cabinet details unless visible in the reference, no changed window layout, no altered millwork, no invented hallway between bedroom and bath, no invented bathroom layout, no extra mirrors, no changed mirror size, no changed stone/slab, no changed tile, no exaggerated tile stripes, no wrong plumbing fixtures, no missing body-spray/fixture impression where visible, no distorted tub, no warped vanity, no people, no text, no logo, no slideshow pan.
```

## Optional One-Master-Video Alternative

If Higgsfield performs better with one continuous video, create a single `30-34 second` master video with these chapters:

1. `0:00-0:08` Exterior to entry.
2. `0:08-0:17` Entry to family/kitchen/office.
3. `0:17-0:25` Stairs to upstairs.
4. `0:25-0:34` Primary suite to bath and zoom-out.

However, for the website implementation, separate clips are still recommended because the scroll-snap interaction needs one clean video per scroll scene.

## Final Website Notes

- Use separate MP4s for the hero scroll.
- Keep clips at `8-9 seconds`.
- No text inside videos.
- The website already has nav and scroll cue, so the video should remain clean.
- The 5th scroll should move into the existing Panoee 360 walkthrough section.
- Once clips are uploaded, map the MP4 filenames into `HERO_ROOMS` and remove/reduce Ken Burns fallback for video scenes.
