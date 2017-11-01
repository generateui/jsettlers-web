class BoardBehaviorPicker {
    constructor(el, boardRenderer, behaviors) {
        this.boardRenderer = boardRenderer;
        this.behaviors = behaviors || [new SetHex(), new ShowAllNodes()];

        for (var behavior of this.behaviors) {
            var behaviorName = behavior.constructor.name;
            var id = `behavior-${behaviorName}`;
            var radioEl = document.createElement("input");
            radioEl.type = "radio";
            radioEl.value = behaviorName;
            radioEl.id = id;
            radioEl.name = "boardbehaviorPicker";
            radioEl.behavior = behavior;
            radioEl.onchange = event => {
                var optionItem = event.target;
                var newBehavior = optionItem.behavior;
                this.behavior = newBehavior;
                this.boardRenderer.behavior = newBehavior;
            }

            var labelEl = document.createElement("label");
            labelEl.textContent = behaviorName;
            labelEl.htmlFor = id;

            el.appendChild(radioEl);
            el.appendChild(labelEl);
        }
    }
}