var Executor = Java.type("io.github.wysohn.triggerreactor.core.script.interpreter.Executor")
var TriggerReactor = Java.type("io.github.wysohn.triggerreactor.core.main.TriggerReactor")

function registerNamed(name) {
	var trigger = TriggerReactor.getInstance().getNamedTriggerManager().getTriggerForName(name)
	if (trigger === null) {
		print("--- No Named Trigger named " + name + " found.  Skipping executor registration  for " + name + " ---")
	}
	
	var exe = new Executor {
        execute: function(timing, sync, vars, context, args) {
            var oldArgs = vars["args"]
			vars["args"] = args
			vars["return"] = null
			trigger.setSync(true)
		    trigger.activate(context, vars)
			var rtn = vars["return"]
			if (typeof rtn !== "number" || rtn < 0 || rtn > 3)
				rtn = null
			
			vars["args"] = oldArgs
			return rtn
        }
    };
	TriggerReactor.getInstance().getExecutorManager().getBackedMap()[name.toUpperCase()] = exe
}

function REGISTEREXECUTORS(args) {
	for (var i = 0; i < args.length; i++) {
		registerNamed(args[i])
	}
}
