import { DOC } from './constants';
import Quill from 'quill';

DOC.ready(() => {
  const wrappers = $('.js-editor');
  const modulesOptions = {
    'toolbar': [
      [{ 'header': '1' }, { 'header': '2' } ],
      [ 'bold', 'italic', 'underline' ]
    ]
  };

  wrappers.each((i,el) => {
    const container = el.querySelector('.js-editor-container');
    new Quill(container, {
      bounds: container,
      modules: modulesOptions,
      theme: 'snow'
    });
  });

});
