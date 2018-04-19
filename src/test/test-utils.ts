import * as React from 'react';
import * as sinon from 'sinon';
import { mount } from 'enzyme';
import { shallowWithIntl } from 'enzyme-react-intl';
import getStore from '../store';
import { AppState } from '../reducer';

export const store = getStore();

export function shallowwithStoreAndIntl(children: React.ReactNode) {
    return shallowWithIntl(React.cloneElement(children, {
        store
    })).dive().dive();
}

export function mountWithStore(children: React.ReactNode, withStore?: Store<AppState>) {
    return mount(React.cloneElement(children, {
        store: withStore || store
    }));
}

export function stubFetchWithResponse(response: {}): Promise {
    return sinon.stub(global, 'fetch').callsFake(() =>
        Promise.resolve({status: 200, ok: true, json: () => (response)}));
}

export function stubFetchWithErrorResponse(status?: number) {
    return sinon.stub(global, 'fetch').callsFake(() =>
        Promise.resolve({status: status || 500, text: () => Promise.resolve('Skal kaste feil')}));
}

export function promiseWithSetTimeout() {
    return new Promise(resolve => setTimeout(resolve, 0));
}

export function resetAndMakeHrefWritable() {
    return Object.defineProperty(document.location, 'href', {
        writable: true,
        value: ''
    });
}