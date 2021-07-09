import {Selector} from 'testcafe';

/*
*  Scenario #1
*
*  Verify that the data that is passed through attributes to the component, is in the Shadow DOM
*
* */

fixture`Profile Card Test`
    .page`../demo.html`;

const component = Selector('profile-card');
test('Test Web Component Exist ', async t => {
    await t.expect(component.exists).ok()
});

test('Test Profile Image', async t => {
    const url = await component.getAttribute('photo-url');

    const img = component.shadowRoot().find('#photo');

    await t.expect(img.exists).ok()
        .expect(img.getAttribute('src')).eql(url);
});

// TODO get slot inner html
// test('Test Profile Name ', async t => {
//     const fn = await component.find('#fn').innerHTML;
//     const ln = await component.find('#ln').innerHTML;
//
//     const name = component.shadowRoot().find('#name');
//
//     await t.expect(name.exists).ok()
//         .expect(name.innerHTML).eql(`${fn} ${ln}`);
// });

test('Test Profile Primary Color', async t => {
    const color = 'rgb(26, 87, 241)';

    const div = component.shadowRoot().find('div.photo');

    await t.expect(div.exists).ok()
        .expect(div.getStyleProperty('background-color')).eql(color);
});

test('Test Profile Secondary Color', async t => {
    const color = 'rgb(255, 255, 255)';

    const div = component.shadowRoot().find('div.data');

    await t.expect(div.exists).ok()
        .expect(div.getStyleProperty('background-color')).eql(color);
});

test('Test Profile Github Link', async t => {
    const github = await component.getAttribute('github-url');

    const a = component.shadowRoot().find('#github');

    await t.expect(a.exists).ok()
        .expect(a.getAttribute('href')).eql(github);
});

test('Test Profile Gitlab Link', async t => {
    const gitlab = await component.getAttribute('gitlab-url');

    const a = component.shadowRoot().find('#gitlab');

    await t.expect(a.exists).ok()
        .expect(a.getAttribute('href')).eql(gitlab);
});

test('Test Profile Twitter Link', async t => {
    const twitter = await component.getAttribute('twitter-url');

    const a = component.shadowRoot().find('#twitter');

    await t.expect(a.exists).ok()
        .expect(a.getAttribute('href')).eql(twitter);
});

test('Test Button Call-to-action', async t => {
    const text = await component.getAttribute('call-to-action');

    const button = component.shadowRoot().find("#call-to-action");

    await t.expect(button.exists).ok()
        .expect(button.innerText).eql(text)
        .setNativeDialogHandler(() => true)
        .click(button);
});