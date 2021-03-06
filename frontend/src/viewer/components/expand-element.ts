import { css, CSSResult, customElement, html, LitElement, property, TemplateResult } from 'lit-element';

@customElement('expand-ctrl-element')
export class ExpandElement extends LitElement {
  @property({ attribute: false })
  expanded = false;

  @property()
  map: google.maps.Map | null = null;

  element: Element | null = null;

  constructor() {
    super();
    const fs = document.getElementsByClassName('fs-enabled');
    if (fs && fs.length) {
      const el = (this.element = fs[0]);
      el.addEventListener('fullscreenchange', () => {
        this.expanded = document.fullscreenElement != null;
      });
    }
  }

  static get styles(): CSSResult[] {
    return [
      css`
        :host {
          display: block;
          border: 1px inset #555;
          padding: 4px;
          margin: 2px 5px;
          background-color: #adff2f;
          text-align: right;
          border-radius: 4px;
          opacity: 0.9;
          user-select: none;
          float: right;
          clear: both;
        }
      `,
    ];
  }

  protected toggleExpand(): void {
    this.expanded = !this.expanded;
    if (this.element) {
      if (this.expanded) {
        this.element.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
    if (this.map) {
      // In full screen mode the gesture handling must be greedy.
      // Using ctrl (+ scroll) is unnecessary as thr page can not scroll anyway.
      this.map.setOptions({ gestureHandling: this.expanded ? 'greedy' : 'auto' });
    }
  }

  render(): TemplateResult {
    return html`
      <link rel="stylesheet" href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css" />
      <i class="fas ${this.expanded ? 'fa-compress' : 'fa-expand'} fa-2x" @click=${this.toggleExpand}></i>
    `;
  }
}
