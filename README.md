# Tombo's \<audio-player\> Web Component

A super-basic web component that wraps around the Audio API to make a nice looking player with album art and simple metadata.

## Usage

First, add this script to whichever page you're adding a player to. It'll load the web component.

```html
<script type="text/javascript" src="//tombofry.github.io/audio-player-component/audio-player-component.min.js" defer></script>
```

### Default style

Then, use the web-component:

```html
<audio-player title="Floating Amongst the Stars" artist="TomboFry" sources="/song-url.opus,/song-url.caf" image="/image-url.jpg" min-height="500"></audio-player>
```

![](images/screenshot-default.jpg)

### Compact

A compact player doesn't require anything except a list of sources:

```html
<audio-player sources="/song-url.mp3" compact dark></audio-player>
```

![](images/screenshot-compact-dark.png)

## Options

You can provide the following attributes to the audio player:

* `title` (optional) The audio track's title
* `artist` (optional) The audio track's artist
* `image` (optional) The image used on the player's background.
* `blurred` (optional) If an image is provided, setting this to `false` will
  disable the blur. Enabled by default, unless you leave the `title` AND
  `artist` blank.
* `compact` (optional) If provided, this will remove the title, artist, and
  image, displaying **only** the controls
* `min-height` (optional) If you provide an image, this changes how tall the
  player can be. Defaults to 280px
* `colour` (optional) Changes the colour of the song progress background colour.
  Defaults to `#3FA9F5`
* `dark` (optional) Changes the theme to dark mode
* `sources` (**required**) A comma-separated list of URLs containing one or more
  audio source for this player, in order of priority
