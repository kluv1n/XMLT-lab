export class FormComponent {
    constructor(parent) {
        this.parent = parent
    }
    
    getHTML() {
        return `<div class="form-container">
    <h2>Redact Item</h2>
    <form action="#" method="post">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" name="title" placeholder="Enter title" required>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" name="description" rows="4" placeholder="Enter description" required></textarea>
      </div>

      <div class="form-group">
        <label for="icon_src">Icon Source (URL)</label>
        <input type="url" id="icon_src" name="icon_src" placeholder="Enter icon URL" required>
      </div>

      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>`
    }

    render() {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}