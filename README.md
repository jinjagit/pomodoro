## Duty Timer

By Simon Tharby, 2018.

My solution to the [Pomodoro Clock exercise](https://www.theodinproject.com/courses/web-development-101/lessons/pairing-project), from the Odin project.

[View in browser](https://jinjagit.github.io/pomodoro/)

For this project, the instructions were to simply produce a browser app that functions like [this](http://romantic-trouble.surge.sh/) example. No step-by-step guidance, nor other support specific to this exercise, was provided.

My solution is 90% pure JavaScript, mainly to enable restyling when the app switches between display 'modes' (settings / on duty timer / off duty timer) and resizing when constrained by smaller window dimensions.

### Features:

  * More intuitive controls design and layouts, compared to the example app.
  * Cleaner layout(s) than the example app, since only the settings _or_ a timer countdown display are shown at any time.
  * Setting larger timer start values takes _far_ fewer clicks than for the example app, due to the inclusion of separate increment / decrement controls for hours, tens-of minutes and minutes.
  * Alarm, with mute / unmute control.
  * Progress bar for timer(s).
  * Color coding of displays (to enable easier / quicker reading, and clarify the how the settings relate to the two timers; on duty vs. off duty).

### Comments:

Although the pure JavaScript approach seems to be long-winded, this is because almost all styling is now included in the .js file, and not a CSS file. This approach enabled the resizing of the app when constrained by smaller windows and the dynamic changes of layouts, colors and contents needed for the design I chose.

I'm really pleased with the way the design looks clean and elegant (in my opinion), and has the sci-fi vibe I aimed for.
