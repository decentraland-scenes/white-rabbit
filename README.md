## White Rabbit Night Club

The White Rabbit is a 24/7 night club, at -65,85.

![](screenshot/screenshot.png)

This scene shows you:

- How to stream audio and video
- How to animate lights, smoke and other effects
- How to sync effects for all players with messagebus messages
- How to allowlist players as admins with special permissions in a scene
- How to teleport a player within a scene
- How to create a cool glass-breaking effect
- How to make an arcade machine

Special admin players have the ability to control all of the lighting effects via a special UI panel only they can access. A series of timed effects can also be scheduled to be triggered in sequence, based on a timestamp on an external server.

## Try it out

**Install the CLI**

Download and install the Decentraland CLI by running the following command:

```bash
npm i -g decentraland
```

**Previewing the scene**

Download this example and navigate to its directory, then run:

```
$:  dcl start
```

Any dependencies are installed and then the CLI opens the scene in a new browser tab.

**Scene Usage**

Take the leaf as a raft up to the mushroom, where you can teleport up into the club.

If you're listed as an admin in the scene, you can open the effects UI by pressing E to control all of the lighting effects. These effects are otherwise played in a fixed sequence, checking the time in a universal time API, and looping the same sequence every 10 minutes.

Admin players can also open the Bouncer API by pressing F. They can write down the name of another player and teleport them to the 0,0 of the scene if they're being problematic. See the [Digital Bouncer](https://github.com/decentraland-scenes/digital-bouncer) example scene for a simpler version of that.

Clicking on any of the windows breaks them.

The arcade machines can also be played, using E and F to move the pad, and click to shoot the ball.

Learn more about how to build your own scenes in our [documentation](https://docs.decentraland.org/) site.

If something doesn’t work, please [file an issue](https://github.com/decentraland-scenes/Awesome-Repository/issues/new).

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
