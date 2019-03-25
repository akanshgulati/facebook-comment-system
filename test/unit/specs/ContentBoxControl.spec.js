import Vue from 'vue';
import ContentBoxControl from '@/components/ContentBoxControl';
import { createRenderer } from 'vue-server-renderer';

describe('ControlBoxControl.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ContentBoxControl);
    const vm = new Constructor({
      propsData: {
        depth: 1,
        count: 2,
      },
    }).$mount();
    expect(vm.$el.children.length).toEqual(2);
  });
  it('should show comment string for depth 1', () => {
    const Constructor = Vue.extend(ContentBoxControl);
    const vm = new Constructor({
      propsData: {
        depth: 1,
        count: 2,
      },
    }).$mount();
    expect(vm.$el.children[0].innerHTML).toContain('Comment');
  });
  it('should show reply string for depth 2', () => {
    const Constructor = Vue.extend(ContentBoxControl);
    const vm = new Constructor({
      propsData: {
        depth: 2,
        count: 2,
      },
    }).$mount();
    expect(vm.$el.children[0].innerHTML).toContain('Reply');
  });
  it('should show replies count for count 2', () => {
    const Constructor = Vue.extend(ContentBoxControl);
    const vm = new Constructor({
      propsData: {
        depth: 2,
        count: 2,
      },
    }).$mount();
    expect(vm.$el.children[1].innerHTML).toContain('2');
    expect(vm.$el.children[1].innerHTML).toContain('Replies');
  });
  it('should show reply count for count 1 and depth 2', () => {
    const Constructor = Vue.extend(ContentBoxControl);
    const vm = new Constructor({
      propsData: {
        depth: 2,
        count: 1,
      },
    }).$mount();
    expect(vm.$el.children[1].innerHTML).toContain('1');
    expect(vm.$el.children[1].innerHTML).toContain('Reply');
  });
  it('should show reply count for count 1 and depth 1', () => {
    const Constructor = Vue.extend(ContentBoxControl);
    const vm = new Constructor({
      propsData: {
        depth: 1,
        count: 1,
      },
    }).$mount();
    expect(vm.$el.children[1].innerHTML).toContain('1');
    expect(vm.$el.children[1].innerHTML).toContain('Comment');
  });
  it('should show reply count for count 2 and depth 1', () => {
    const Constructor = Vue.extend(ContentBoxControl);
    const vm = new Constructor({
      propsData: {
        depth: 1,
        count: 2,
      },
    }).$mount();
    expect(vm.$el.children[1].innerHTML).toContain('2');
    expect(vm.$el.children[1].innerHTML).toContain('Comments');
  });

  it('should match the snapshot with depth 1 and count 1', (done) => {
    const renderer = createRenderer();
    const Constructor = Vue.extend(ContentBoxControl);
    const vm = new Constructor({
      propsData: {
        depth: 1,
        count: 1,
      },
    }).$mount();
    renderer.renderToString(vm, (err, str) => {
      expect(str).toMatchSnapshot();
      done();
    });
  });

  it('should match the snapshot with depth 2 and count 2', (done) => {
    const renderer = createRenderer();
    const Constructor = Vue.extend(ContentBoxControl);
    const vm = new Constructor({
      propsData: {
        depth: 2,
        count: 2,
      },
    }).$mount();
    renderer.renderToString(vm, (err, str) => {
      expect(str).toMatchSnapshot();
      done();
    });
  });
});
