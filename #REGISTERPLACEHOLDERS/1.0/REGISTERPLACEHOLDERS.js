var Placeholder = Java.type("io.github.wysohn.triggerreactor.core.script.interpreter.Placeholder")
var TriggerReactor = Java.type("io.github.wysohn.triggerreactor.core.main.TriggerReactor")

function registerNamed(name) {
	var trigger = TriggerReactor.getInstance().getNamedTriggerManager().getTriggerForName(name)
	if (trigger === null) {
		print("--- No Named Trigger named " + name + " found.  Skipping placeholder registration  for " + name + " ---")
	}
	
	var exe = new Placeholder {
        parse: function(timing, context, vars, args) {
			var oldArgs = vars["args"]
            vars["args"] = args
			vars["return"] = null
			trigger.setSync(true)
		    trigger.activate(context, vars)
			vars["args"] = oldArgs
			return vars["return"]
        }
    }
	TriggerReactor.getInstance().getPlaceholderManager().getBackedMap()[name.toUpperCase()] = exe
}

function REGISTERPLACEHOLDERS(args) {
	for (var i = 0; i < args.length; i++) {
		registerNamed(args[i])
	}
}
