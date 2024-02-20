// select-stepper.js

class SelectStepper extends HTMLElement {
  hasRendered; // Flag for whether or not the render() method has run
  ELEMS; // References to elements in the shadow DOM
  selectElem; // The slotted <select> element
  options; // The <options> elements within the slotted <select>

  constructor() {
    super();

    // Create the shadow DOM
    this.attachShadow({ mode: 'open' });

    this.hasRendered = false; // Initialize the "has rendered" flag
    this.ELEMS = {}; // Create an object to store the element references
    this.options = []; // Create an array to store the <option> references

    // Bind the correct "his" to t he handleChildAppended method
    this.handleChildAppended = this.handleChildAppended.bind(this);
    this.shadowRoot.addEventListener('slotchange', this.handleChildAppended);

    this.addEventListener('click', () => {
      this.classList.toggle('selected');
      this.selectElem?.setAttribute(
        'readonly',
        this.classList.contains('selected')
      );
      this.selectElem?.setAttribute(
        'disabled',
        this.classList.contains('selected')
      );
    });
  }

  connectedCallback() {
    // Render the first time the element is connected
    this.render();
  }

  handleChildAppended(e) {
    // Grab the reference to the <select> element
    let slottedNodes = this.ELEMS.slot.assignedNodes();
    this.selectElem = slottedNodes.filter((n) => n.nodeName === 'SELECT').pop();
    if (!this.selectElem) return;

    // TODO fill out this comment
    if (this.selectElem.hasAttribute('readonly')) {
      this.classList.add('selected');
    }

    this.options.push(...this.selectElem.options); // Grab all of the options
    this.options = this.options.map((o) => {
      return {
        value: o.value,
        text: o.innerText,
      };
    });
    console.log(this.options);
  }

  render() {
    if (this.hasRendered) return;
    this.hasRendered = true;

    this.shadowRoot.innerHTML = /* HTML */ `
      <!-- Styles -->
      <style>
        :host {
          display: grid;
          grid-template-columns: auto 1fr auto;
        }

        :host(.selected) button {
          visibility: hidden;
        }

        ::slotted(*) {
          display: none;
        }

        button {
          width: 10dvw;
        }
      </style>
      <!-- Markup -->
      <button id="step-down">&lt;</button>
      <input type="number" readonly />
      <button id="step-up">&gt;</button>
      <!-- For use with the slotchange event -->
      <slot></slot>
    `;

    // Save element references
    this.ELEMS.stepDownBtn = this.shadowRoot.querySelector('#step-down');
    this.ELEMS.stepUpBtn = this.shadowRoot.querySelector('#step-up');
    this.ELEMS.input = this.shadowRoot.querySelector('input[type="number"]');
    this.ELEMS.slot = this.shadowRoot.querySelector('slot');
  }
}

customElements.define('select-stepper', SelectStepper);
