var AttributeModifier = Java.type("org.bukkit.attribute.AttributeModifier")
var Attribute = Java.type("org.bukkit.attribute.Attribute")
var Operation = Java.type("org.bukkit.attribute.AttributeModifier.Operation")
var EquipmentSlot = Java.type("org.bukkit.inventory.EquipmentSlot")
var UUID = Java.type("java.util.UUID")
var ItemStack = Java.type("org.bukkit.inventory.ItemStack")

//item, attr1, amount1, slot1|"ALL"...
function ITEMATTRS(args) {
	if (args.length < 4)
		throw new Error("Too few arguments.")
	
	if ((args.length - 1) % 3 !== 0)
		throw new Error("Invalid number of arguments")
	
	var item = args[0]
	if (!(item instanceof ItemStack) || item === null) {
        throw new Error("Invalid item: " + item)
	}
	
	var meta = item.getItemMeta()
	if (meta === null)
		throw new Error("could not apply attribute modifiers to " + item.getType().name())
	
	for (var i = 1; i <= (args.length - 1) / 3; i++) {
		var base = (i - 1) * 3 + 1
		
		var attr = args[base]
		if (typeof attr !== "string") {
			throw new Error("The attribute type must be a string")
		}
		attr = Attribute[attr.toUpperCase()]
		if (attr === null) {
			throw new Error("Invalid attribute: " + args[base])
		}
		
		var amount = args[base + 1]
		if (typeof amount !== "number") {
			throw new Error("the modifier amount must be a number")
		}
		
		var slot = args[base + 2]
		if (typeof slot !== "string") {
			throw new Error("The slot must be a string")
		}
		
		if (slot.toUpperCase() !== "ALL") {
		    slot = EquipmentSlot[slot.toUpperCase()]
		    if (slot === null) {
				throw new Error("Invalid slot: " + args[base + 2])
			}
		    meta.addAttributeModifier(attr, new AttributeModifier(UUID.randomUUID(), attr.toString(), amount, Operation.ADD_NUMBER, slot))
		} else {
		    meta.addAttributeModifier(attr, new AttributeModifier(UUID.randomUUID(), attr.toString(), amount, Operation.ADD_NUMBER))
		}
	}
	item.setItemMeta(meta)
}
