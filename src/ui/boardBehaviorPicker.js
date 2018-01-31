class BoardBehaviorPicker extends Observable {
    constructor(el, boardRenderer, behaviors) {
        super();
        
        this.boardRenderer = boardRenderer;
        this.behaviors = behaviors || [new SetHex(), new ShowAllNodes()];
        this.behavior = behaviors[0];

        this.makeObservable(["behavior"]);

        for (var behavior of this.behaviors) {
            var behaviorName = behavior.constructor.name;
            var id = `behavior-${behaviorName}`;
            var radioEl = document.createElement("input");
            radioEl.type = "radio";
            radioEl.value = behaviorName;
            radioEl.id = id;
            radioEl.name = "boardbehaviorPicker";
            radioEl.behavior = behavior;
            var that = this;
            radioEl.onchange = event => {
                var optionItem = event.target;
                var newBehavior = optionItem.behavior;
                that.behavior = newBehavior;
                that.boardRenderer.behavior = newBehavior;
            }

            var labelEl = document.createElement("label");
            labelEl.textContent = behaviorName;
            labelEl.htmlFor = id;

            el.appendChild(radioEl);
            el.appendChild(labelEl);
        }
    }
}