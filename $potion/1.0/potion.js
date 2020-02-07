var PotionEffect = Java.type("org.bukkit.potion.PotionEffect")
var PotionEffectType = Java.type("org.bukkit.potion.PotionEffectType")
var ItemStack = Java.type("org.bukkit.inventory.ItemStack")
var Material = Java.type("org.bukkit.Material")
var Color = Java.type("org.bukkit.Color")
var PotionType = Java.type("org.bukkit.potion.PotionType")
var PotionData = Java.type("org.bukkit.potion.PotionData")



//splash, effect1, amplifier1, duration1, ..., color
function potion(args) {
	var types = {
    	"normal": Material.POTION,
    	"splash": Material.SPLASH_POTION,
    	"lingering": Material.LINGERING_POTION,
    	"tipped": Material.TIPPED_ARROW
    }
	
	if (args.length < 1)
		throw new Error("Not enough arguments.")
	
	var type = args[0]
	if (typeof type !== "string" || types[type] === undefined) {
		throw new Error("Invalid potion type: " + type)
	}
	
	var material = types[type]
	
	var potion = new ItemStack(material)
	var effects = Math.floor((args.length - 1) / 3)
	var meta = potion.getItemMeta()
	
	for (var i = 0; i < effects; i++) {
		var base = i * 3 + 1
		
		var effect = args[base]
		if (typeof effect !== "string") {
			throw new Error("effect type must be a string")
		}
	    effect = PotionEffectType.getByName(effect.toUpperCase())
		if (effect === null) {
			throw new Error("Invallid potion effect type: " + args[base])
		}
		
		var amplifier = args[base + 1]
		if (typeof amplifier !== "number" || amplifier !== Math.round(amplifier)) {
			throw new Error("The amplifier must be a whole number")
		}
		if (amplifier < 1) {
			throw new Error("The amplifier must be at least 1")
		}
		amplifier-- // amplifier is 0-indexed
		
		var duration = args[base + 2]
		if (typeof duration !== "number" || duration < 0.05) {
			throw new Error("The duration must be a positive number and at least 0.05")
		}
		duration = Math.round(duration * 20) //convert to ticks
		if (type === "lingering") {
			duration *= 4 //lingering potions will divide their durations by 4
		} else if (type === "tipped") {
			duration *= 8 //tipped arrows divide by 8
		}
		
		meta.addCustomEffect(new PotionEffect(effect, duration, amplifier), true)
	}
	
	if (args.length > effects * 3 + 1) {
		var color = args[args.length - 1]
		if (!(color instanceof Color)) {
			throw new Error("color must be a Color object")
		}
		meta.setColor(color)
	}
	
	potion.setItemMeta(meta)
	return potion
}
