var ItemStack = Java.type("org.bukkit.inventory.ItemStack")
var Enchantment = Java.type("org.bukkit.enchantments.Enchantment")

function ENCHANT(args) {
	if (args.length < 3) {
		throw new Error("Too few arguments.  Must have at least 3")
	}
	
	if (args.length % 2 !== 1)
		throw new Error("Invalid number of arguments")
	
	var item = args[0]
	if (!(item instanceof ItemStack) || item === null) {
        throw new Error("Invalid item: " + item)
	}
	
	var meta = item.getItemMeta()
	if (meta === null)
		throw new Error("could not apply enchantments to " + item.getType().name())
	
	for (var base = 1; base < args.length; base += 2) {
		var enchant = args[base]
		if (typeof enchant !== "string") {
			throw new Error("the enchantment must be a string")
		}
		
		enchant = Enchantment.getByName(enchant.toUpperCase())
		if (enchant === null) {
			throw new Error("Invalid enchantment: " + args[base])
		}
		
		var level = args[base + 1]
		if (typeof level !== "number" || level < 0 || Math.round(level) !== level) {
			throw new Error("The level must be a positive whole number")
		}
		
		if (level > 32767) {
			level = 32767
		}
		
		meta.addEnchant(enchant, level, true)
	}
	
	item.setItemMeta(meta)
}
