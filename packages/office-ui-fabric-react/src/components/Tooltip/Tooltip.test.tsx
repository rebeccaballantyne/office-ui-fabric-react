import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';

import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { DirectionalHint } from '../../common/DirectionalHint';
import { TooltipBase } from './Tooltip.base';
import { TooltipDelay } from './Tooltip.types';
import { ICalloutProps } from '../../Callout';

const defaultCalloutProps: ICalloutProps = {
  isBeakVisible: true,
  beakWidth: 16,
  gapSpace: 0,
  setInitialFocus: true,
  doNotLayer: false
};

// tslint:disable:jsx-no-lambda

describe('Tooltip', () => {
  it('renders default Tooltip correctly', () => {
    const component = mount(<TooltipBase />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('uses default documented properties', () => {
    const component = mount(<TooltipBase />);

    expect(component.prop('delay')).toEqual(TooltipDelay.medium);
    expect(component.prop('directionalHint')).toEqual(DirectionalHint.topCenter);
    expect(component.prop('maxWidth')).toEqual('364px');
    expect(component.prop('calloutProps')).toEqual(defaultCalloutProps);
  });

  it('uses specified properties', () => {
    const calloutProps: ICalloutProps = {
      isBeakVisible: false,
      beakWidth: 0,
      gapSpace: 10,
      setInitialFocus: false,
      doNotLayer: true
    };
    const content = 'test content';
    const directionalHint = DirectionalHint.bottomLeftEdge;
    const directionalHintForRTL = DirectionalHint.topRightEdge;
    const targetElement = ReactTestUtils.renderIntoDocument(<div />) as HTMLElement;

    let onRenderCalled = false;

    const component = mount(
      <TooltipBase
        calloutProps={ calloutProps }
        content={ content }
        directionalHint={ directionalHint }
        directionalHintForRTL={ directionalHintForRTL }
        onRenderContent={
          () => {
            onRenderCalled = true;
            return null;
          }
        }
        targetElement={ targetElement }
      />
    );

    expect(onRenderCalled).toEqual(true);

    const callout = component.find('Callout');

    Object.keys(calloutProps).forEach((key: (keyof ICalloutProps)) => {
      expect(callout.prop(key)).toEqual(calloutProps[key]);
    });

    expect(callout.prop('content')).toEqual(content);
    expect(callout.prop('directionalHint')).toEqual(directionalHint);
    expect(callout.prop('directionalHintForRTL')).toEqual(directionalHintForRTL);
    expect(callout.prop('target')).toEqual(targetElement);
  });
});
