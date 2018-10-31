import selectize from 'selectize';
import { DOC } from './constants';

DOC.ready(() => {
  const container = $('.js-tagsinput');
  container
    .selectize({
      delimiter: ',',
      persist: false,
      createOnBlur: true,
      create: function(input) {
        return {
          value: input,
          text: input
        }
      }
    });
});