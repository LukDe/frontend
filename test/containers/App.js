// must emulate DOM _very first_
import  '../helpers/emulateDom';

import unexpected from 'unexpected';
import unexpectedReact from 'unexpected-react';
import unexpectedSinon from 'unexpected-sinon';
import sinon from 'sinon';

const expect = unexpected.clone()
  .use(unexpectedReact)
  .use(unexpectedSinon);

import React from 'react'
import { createRenderer, Simulate, renderIntoDocument, findRenderedDOMComponentWithTag } from 'react-addons-test-utils'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';

import Moment from 'moment';

import wrappedTestFactory from '../helpers/wrappedTestFactory';

import { App } from '../../containers/App'
import LoginPage from '../../containers/user/LoginPage'

function setup(customProps) {
  let props = {
    tryRestoreLogin: sinon.spy(),
    refreshLogin: sinon.spy(),
    logout: sinon.spy(),
    resetErrorMessage: sinon.spy(),
    login: {
      expires: new Moment().add(20, 'minutes').toDate()
    },
    muiTheme: getMuiTheme()
  };
  Object.assign(props, customProps);

  let renderer = createRenderer();
  renderer.render(<App {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  }
}

describe('containers', () => {
  describe('App', () => {
    it('should render correctly', () => {
      const { renderer } = setup();

      expect(renderer, 'to have rendered',
        <div>
          <AppBar title={<span>CaTUstrophy</span>} />
          <main>
            <Snackbar message=" " open={false} />
          </main>
        </div>
      );
    });

    it('should show login page when not logged in', () => {
      const { renderer } = setup({ login: null });

      expect(renderer, 'to have rendered', <LoginPage />);
    });

    it('should refresh the login when close to expiry', (done) => {
      const { props } = setup({
        login: {
          expires: new Moment().add(1, 'minutes').toDate()
        }
      });

      setTimeout(() => {
        expect(props.refreshLogin, 'was called');
        done();
      }, 1500);
    });

    it('should not refresh the login when still valid for a long time', (done) => {
      const { props } = setup();

      setTimeout(() => {
        expect(props.refreshLogin, 'was not called');
        done();
      }, 1500);
    });
  })
});