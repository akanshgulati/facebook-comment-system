import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import NewPost from '@/components/NewPost';
import { createRenderer } from 'vue-server-renderer'

describe('NewPost.vue', () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        currentUser: {
          image: '1.png'
        }
      }
    })
  });

  it('should match the snapshot', () => {
    const renderer = createRenderer();
    const Constructor = Vue.extend(NewPost);
    const vm = new Constructor({
      propsData: {
        placeholder: 'this is placeholder',
      },
      store
    }).$mount();
    renderer.renderToString(vm, (err, str) => {
      expect(str).toMatchSnapshot();
    })
  });

  it('should match the snapshot with primary', () => {
    const renderer = createRenderer();
    const Constructor = Vue.extend(NewPost);
    const vm = new Constructor({
      propsData: {
        placeholder: 'this is placeholder',
        isPrimary: true
      },
      store
    }).$mount();
    renderer.renderToString(vm, (err, str) => {
      expect(str).toMatchSnapshot();
    })
  });

  it('should add correct user image', () => {
    const Constructor = Vue.extend(NewPost);
    const vm = new Constructor({
      propsData: {
        placeholder: 'this is placeholder',
        count: 2
      },
      store
    }).$mount();
    expect(vm.$el.querySelector('.new-post__img').hasAttribute('src')).toBeTruthy();
    expect(vm.$el.querySelector('.new-post__img').getAttribute('src')).toBe('1.png');
  });

  it('should add correct placeholder', () => {
    const Constructor = Vue.extend(NewPost);
    const vm = new Constructor({
      propsData: {
        placeholder: 'this is placeholder',
        count: 2
      },
      store
    }).$mount();
    const placeholderText = vm.$el.querySelector('.new-post__content').children[0].getAttribute('placeholder');
    expect(placeholderText).toBe('this is placeholder');
  });
});
