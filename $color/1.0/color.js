var Color = Java.type("org.bukkit.Color")

function color(args) {
	var color = args[0]
	if (typeof color !== "string") {
		throw new Error("color must be a string")
	}
	color = Color[color.toUpperCase()]
	if (color === null) {
		throw new Error("Invalid color: " + args[args.length - 1])
	}
	
	return color
}
