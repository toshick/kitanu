// Cypress.Commands.add('fill', { prevSubject: 'element' }, (subject, text) => {
//   subject.val(text);
//   return cy.wrap(subject).type('t{backspace}');
// });

// Cypress.Commands.add(
//   'updateTextInput',
//   { prevSubject: true },
//   (subject, label, value) => {
//     const values: string[] = Array.isArray(value) ? value : [value];
//     cy.get(subject)
//       .findByText(label)
//       .parent()
//       .find(`input[type='text'],input[type='date']`)
//       .each(($el, index) => {
//         cy.wrap($el).as('input');
//         cy.get('@input').clear();
//         const type = $el.attr('type');
//         if (values[index]) {
//           if (type === 'date') {
//             cy.get('@input').type(values[index]);
//           } else {
//             cy.get('@input').fill(values[index]);
//           }
//         }
//       });
//     cy.get(subject).then((subj) => {
//       return subj;
//     });
//   },
// );

// Cypress.Commands.add(
//   'updateNumberInput',
//   { prevSubject: true },
//   (subject, label, value) => {
//     cy.get(subject)
//       .findByText(label)
//       .parent()
//       .find(`input[type='number']`)
//       .as('input');
//     cy.get('@input').clear();
//     if (value) cy.get('@input').type(value);
//     cy.get(subject).then((subj) => {
//       return subj;
//     });
//   },
// );

// Cypress.Commands.add(
//   'updateDateInput',
//   { prevSubject: true },
//   (subject, label, value) => {
//     const values: string[] = Array.isArray(value) ? value : [value];
//     cy.get(subject)
//       .findByText(label)
//       .parent()
//       .find(`input[type='date'], input[type='datetime-local']`)
//       .each(($el, index) => {
//         cy.wrap($el).as('input').clear();
//         if (values[index]) {
//           cy.get('@input').type(values[index]);
//         }
//       });

//     cy.get(subject).then((subj) => {
//       return subj;
//     });
//   },
// );

// Cypress.Commands.add(
//   'updateSelect',
//   { prevSubject: true },
//   (subject, label, value) => {
//     cy.get(subject)
//       .findByText(label)
//       .parent()
//       .as('parent')
//       .find(`.BaseSelect__Button`)
//       .as('input');
//     cy.get('@input').click();
//     cy.get('@parent').findByText(value).click();
//     cy.get(subject).then((subj) => {
//       return subj;
//     });
//   },
// );

// Cypress.Commands.add(
//   'updateCheckboxGroup',
//   { prevSubject: true },
//   (subject, label, values) => {
//     cy.get(subject).findByText(label).parent().as('parent');
//     for (const value of values) {
//       cy.get('@parent').findByText(value).click();
//     }
//     cy.get(subject).then((subj) => {
//       return subj;
//     });
//   },
// );

// Cypress.Commands.add(
//   'updateRadioButtonGroup',
//   { prevSubject: true },
//   (subject, label, value) => {
//     cy.get(subject).findByText(label).parent().findByText(value).click();
//     cy.get(subject).then((subj) => {
//       return subj;
//     });
//   },
// );

// Cypress.Commands.add(
//   'updateTextarea',
//   { prevSubject: true },
//   (subject, value) => {
//     cy.get(subject).get('textarea').fill(value);
//     cy.get(subject).then(() => {
//       return subject;
//     });
//   },
// );

// Cypress.Commands.add(
//   'updateFileInput',
//   { prevSubject: true },
//   (subject, file, fileType, encoding = undefined) => {
//     cy.fixture(file, encoding).then((mockFile) => {
//       const blob = Cypress.Blob.base64StringToBlob(mockFile, fileType);
//       const fileObject = new File([blob], file, { type: fileType });
//       const dataTransfer = new DataTransfer();
//       dataTransfer.items.add(fileObject);
//       subject[0].files = dataTransfer.files;
//       cy.wrap(subject).trigger('change', { force: true });
//     });
//   },
// );

// Cypress.Commands.add(
//   'updateFileInputBase64',
//   { prevSubject: true },
//   (subject, filename, filedata, fileType = undefined) => {
//     const blob = Cypress.Blob.base64StringToBlob(filedata, fileType);
//     const fileObject = new File([blob], filename, { type: fileType });
//     const dataTransfer = new DataTransfer();
//     dataTransfer.items.add(fileObject);
//     subject[0].files = dataTransfer.files;
//     cy.wrap(subject).trigger('change', { force: true });
//   },
// );
