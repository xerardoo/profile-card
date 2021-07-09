customElements.define('profile-card', class extends HTMLElement {

    photoUrl = this.getAttribute('photo-url') || '';
    primaryColor = this.getAttribute('primary-color') || 'gray';
    secondaryColor = this.getAttribute('secondary-color') || 'white';
    fontColor = this.getAttribute('font-color') || '#505050';

    attributesValid = [
        'first-name',
        'last-name',
        'self-description',
        'job-position',
        'github-url',
        'gitlab-url',
        'twitter-url',
        'linkedin-url',
        'primary-color',
        'secondary-color',
        'font-color',
        'photo-url',
        'call-to-action'
    ];

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.getHtml();

        // change font color
        let container = this.shadowRoot.querySelector('div.container');
        container.style['color'] = this.fontColor;

        // change data container background color
        let dataDiv = this.shadowRoot.querySelector('div.data');
        dataDiv.style['background-color'] = this.secondaryColor;

        // change profile photo
        let photoDiv = this.shadowRoot.querySelector('div.photo');
        if (this.photoUrl) {
            let img = document.createElement('img');
            img.setAttribute('id', 'photo');
            img.setAttribute('src', this.photoUrl);
            img.setAttribute('class', 'content');
            photoDiv.append(img)
        } else {
            let div = document.createElement('div');
            div.style['background-color'] = 'gray';
            div.setAttribute('class', 'content');
            photoDiv.append(div)
        }
        // change photo container background color
        photoDiv.style['background-color'] = this.primaryColor;

        // if have attributes and are valid, append to component as slot
        if (this.hasAttributes()) {
            [...this.attributes].forEach(attr => {
                let attrName = attr['name'];
                let attrVal = attr['value'];

                const valid = this.attributesValid.find(attrValid => attrValid === attrName);
                if (!valid && attrName.charAt(0) !== '@') {
                    console.warn(`err: attribute '${attrName}' no valid`);
                    return;
                }

                // transform attributes to slot if are valid
                let span = document.createElement('span');
                span.setAttribute('slot', attrName);
                span.innerHTML = attrVal;
                this.append(span);

                // set call to action button values
                if (attrName === 'call-to-action') {
                    let data = this.shadowRoot.querySelector('div.data');
                    let button = document.createElement('button');
                    button.setAttribute('id', 'call-to-action');
                    button.innerHTML = attrVal;
                    button.setAttribute('onClick', this.attributes['@call-to-action-click'].value);
                    data.append(button)
                }

                // add hyperlinks to social networks
                let li = document.createElement('li');
                let social = this.shadowRoot.querySelector('ul.social-links');
                switch (attrName) {
                    case 'github-url':
                        li.innerHTML = this.createAnchor('Github', attrVal);
                        social.append(li);
                        break;
                    case 'gitlab-url':
                        li.innerHTML = this.createAnchor('Gitlab', attrVal);
                        social.append(li);
                        break;
                    case 'twitter-url':
                        li.innerHTML = this.createAnchor('Twitter', attrVal);
                        social.append(li);
                        break;
                }
            });
        }
    }

    createAnchor(name, value) {
        let anchor = document.createElement('a');
        anchor.setAttribute('id', name.toLowerCase());
        anchor.setAttribute('href', value);
        anchor.innerText = name;
        anchor.style['background-color'] = this.primaryColor;
        return anchor.outerHTML;
    }

    getHtml() {
        return `
        <style>
        div.container {
            font-family: "Open Sans", sans-serif;
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            min-height: 100px;
            text-align: center;
            border: 1px black solid;
        }
        div.row {
            width: 100%;
            min-height: 200px;
            border: gray solid 1px;
        }    
        ul.social-links {
            list-style-type: none;
            overflow: hidden;
            text-align: center;
            padding: 0;
        }     
        li {
            display: inline;
            margin-left: 5px;
        }       
        a {
            padding: 20px;
            color: white;
        }  
        #call-to-action{
            background-color: #28a745;   
            color: #fff;
            text-align: center;
            border: 1px solid transparent;
            padding: 15px;
            margin-bottom: 10px;
        } 
        .photo {
            width: 100%;
            min-height: 200px;
            display: flex;
            justify-content: center;
        }    
        .photo  .content {
            position: absolute;
            margin-top: 75px;
            max-height: 150px;
            height: 150px;
            width: 150px;
        }
        </style>
            <div class="container">
            <div class="row">
                <div class="photo"></div>
            </div>
            <div class="row data">
                <h1 id="name">
                    <slot name="first-name">-</slot>
                    <slot name="last-name"></slot>
                </h1>
                <h4 id="job-position">
                    <slot name="job-position"></slot>
                </h4>
                <p id="about-me">
                    <slot name="about-me"></slot>
                </p>
                <ul class="social-links"></ul>
            </div>
        </div>`
    }
});