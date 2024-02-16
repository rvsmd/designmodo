
describe("AnimationElement", () => {

  it ("change position animated element x-y", () => {
    cy.visit('/');
    cy.getByTestId('preview').should('be.disabled')
    cy.getByTestId('animationButton').click()
      .should("contain.text", "Button");
    cy.getByTestId('preview').should('be.not.disabled')
    cy.getByTestId('BSlider-X')
      .setSliderValue(85);
    cy.getByTestId('BSlider-X')
      .should('have.value', 85);
    cy.wait(700);
    cy.getByTestId('BSlider-Y')
      .setSliderValue(85);
    cy.getByTestId('BSlider-Y')
      .should('have.value', 85);
    cy.wait(700);
    cy.getByTestId('preview').should('be.not.disabled')
    cy.getByTestId('preview').click();
    cy.getByTestId('preview').click();
    cy.wait(1000);
  })

  it ("change animated element opacity", () => {
    cy.visit('/');
  cy.getByTestId('preview').should('be.disabled')
    cy.getByTestId('animationButton').click();
  cy.getByTestId('preview').should('be.not.disabled')
    cy.getByTestId('BSlider-X')
      .setSliderValue(85);
    cy.wait(700);
    cy.getByTestId('BSlider-Y')
      .setSliderValue(85);
    cy.wait(700);
    cy.getByTestId('BSlider-Opacity')
      .setSliderValue(85);
    cy.wait(700);
    cy.getByTestId('preview').click();
    cy.getByTestId('preview').click();
    cy.wait(1000);
  })

  it ("change animated element scale", () => {
    cy.visit('/');
  cy.getByTestId('preview').should('be.disabled')
    cy.getByTestId('animationButton').click();
  cy.getByTestId('preview').should('be.not.disabled')
    cy.getByTestId('BSlider-X')
      .setSliderValue(85);
    cy.wait(700);
    cy.getByTestId('BSlider-Y')
      .setSliderValue(85);
    cy.wait(700);
    cy.getByTestId('BSlider-Scale')
      .setSliderValue(3);
    cy.wait(700);
    cy.getByTestId('preview').click();
    cy.getByTestId('preview').click();
    cy.wait(1000);
  })

  it ("change animated element Blur", () => {
    cy.visit('/');
  cy.getByTestId('preview').should('be.disabled')
    cy.getByTestId('animationButton').click();
  cy.getByTestId('preview').should('be.not.disabled')
    cy.getByTestId('BSlider-X')
      .setSliderValue(85);
    cy.wait(700);
    cy.getByTestId('BSlider-Y')
      .setSliderValue(85);
    cy.wait(700);
    cy.getByTestId('BSlider-Blur')
      .setSliderValue(3);
    cy.wait(700);
    cy.getByTestId('preview').click();
    cy.getByTestId('preview').click();
    cy.wait(1000);
  })

  it ("change animated element Speed", () => {
    cy.visit('/');
  cy.getByTestId('preview').should('be.disabled')
    cy.getByTestId('animationButton').click();
  cy.getByTestId('preview').should('be.not.disabled')
    cy.getByTestId('BSlider-X')
      .setSliderValue(85);
    cy.wait(700);
    cy.getByTestId('BSlider-Y')
      .setSliderValue(85);
    cy.wait(700);
    cy.getByTestId('BSlider-Speed')
      .setSliderValue(2);
    cy.wait(700);
    cy.getByTestId('preview').click();
    cy.getByTestId('preview').click();
    cy.wait(3000);
  })

  it ("change animated element Delay", () => {
    cy.visit('/');
  cy.getByTestId('preview').should('be.disabled')
    cy.getByTestId('animationButton').click();
  cy.getByTestId('preview').should('be.not.disabled')
    cy.getByTestId('BSlider-X')
      .setSliderValue(85);
    cy.wait(700);
    cy.getByTestId('BSlider-Y')
      .setSliderValue(85);
    cy.wait(700);
    cy.getByTestId('BSlider-Delay')
      .setSliderValue(2);
    cy.wait(700);
    cy.getByTestId('preview').click();
    cy.getByTestId('preview').click();
    cy.wait(3000);
  })

  it ("change animated element Easing", () => {
    cy.visit('/');
  cy.getByTestId('preview').should('be.disabled')
    cy.getByTestId('animationButton').click();
  cy.getByTestId('preview').should('be.not.disabled')
    cy.getByTestId('BSlider-X')
      .setSliderValue(85);
    cy.wait(700);
    cy.getByTestId('BSlider-Y')
      .setSliderValue(85);
    cy.wait(700);
    cy.getByTestId('BSlider-Speed')
      .setSliderValue(2);
    cy.wait(700);
    cy.getByTestId('Sidebar-Easing')
      .select('easeInBack')
      .invoke('val')
      .should('equal', 'cubic-bezier(0.36, 0, 0.66, -0.56)')
    cy.wait(700);
    cy.getByTestId('preview').click();
    cy.getByTestId('preview').click();
    cy.wait(3000);
  })

  it ("change animated element Replay", () => {
    cy.visit('/');
  cy.getByTestId('preview').should('be.disabled')
    cy.getByTestId('animationButton').click();
  cy.getByTestId('preview').should('be.not.disabled')
    cy.getByTestId('BSlider-X')
      .setSliderValue(85);
    cy.wait(700);
    cy.getByTestId('BSlider-Y')
      .setSliderValue(85);
    cy.wait(700);
    cy.getByTestId('BSlider-Speed')
      .setSliderValue(2);
    cy.wait(700);
    cy.getByTestId('BSlider-Delay')
      .setSliderValue(3);
    cy.wait(700);
    cy.getByTestId('Sidebar-Replay')
      .click({ force: true})
    cy.wait(700);
    cy.getByTestId('preview').click();
    cy.getByTestId('preview').click();
    cy.wait(10000);
  })

  it ("first click on preview with save params", () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('animationParams', JSON.stringify({
          x: 85,
          y: -90,
          opacity: 70,
          scale: 2,
          blur: 1,
          speed: 2,
          delay: 4,
          easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
          replay: true,
        }));
        win.localStorage.setItem('animatedElementId', 'user-animatedBtn');
      },
    });
    cy.getByTestId('preview').click();
    cy.wait(10000);
  })

  it ("check change all params", () => {
    cy.visit('/');
    cy.getByTestId('preview').should('be.disabled')
    cy.getByTestId('animationButton').click()
      .should("contain.text", "Button");
    cy.getByTestId('preview').should('be.not.disabled')
    cy.getByTestId('BSlider-X')
      .setSliderValue(85);
    cy.getByTestId('BSlider-X')
      .should('have.value', 85);
    cy.wait(700);
    cy.getByTestId('BSlider-Y')
      .setSliderValue(85);
    cy.getByTestId('BSlider-Y')
      .should('have.value', 85);
    cy.wait(700);
    cy.getByTestId('preview').should('be.not.disabled')
    cy.getByTestId('preview').click();
    cy.wait(1000);
    cy.getByTestId('BSlider-Y')
      .setSliderValue(35);
    cy.getByTestId('BSlider-Y')
      .should('have.value', 35);
    cy.getByTestId('preview').click();
    cy.wait(1000);
    cy.getByTestId('BSlider-Opacity')
      .setSliderValue(75);
    cy.getByTestId('BSlider-Opacity')
      .should('have.value', 75);
    cy.getByTestId('preview').click();
    cy.wait(1000);
    cy.getByTestId('preview').click();
    cy.getByTestId('BSlider-Scale')
    .setSliderValue(-2);
    cy.getByTestId('BSlider-Scale')
      .should('have.value', -2);
    cy.getByTestId('preview').click();
    cy.wait(1000);
    cy.getByTestId('preview').click();
    cy.getByTestId('BSlider-Blur')
    .setSliderValue(2);
    cy.getByTestId('BSlider-Blur')
      .should('have.value', 2);
    cy.getByTestId('preview').click();
    cy.wait(1000);
    cy.getByTestId('preview').click();
    cy.getByTestId('BSlider-Speed')
    .setSliderValue(3);
    cy.getByTestId('BSlider-Speed')
      .should('have.value', 3);
    cy.wait(700);
    cy.getByTestId('preview').click();
    cy.wait(3000);
    cy.getByTestId('BSlider-Delay')
    .setSliderValue(1);
    cy.getByTestId('BSlider-Delay')
      .should('have.value', 1);
    cy.getByTestId('preview').click();
    cy.wait(6000);
    cy.getByTestId('BSlider-Y')
      .setSliderValue(-5);
    cy.getByTestId('BSlider-Y')
      .should('have.value', -5);
    cy.wait(1000);
    cy.getByTestId('BSlider-Y')
      .setSliderValue(-15);
    cy.getByTestId('BSlider-Y')
      .should('have.value', -15);
    cy.wait(1000);
    cy.getByTestId('BSlider-Y')
      .setSliderValue(-25);
    cy.getByTestId('BSlider-Y')
      .should('have.value', -25);
    cy.wait(1000);
    cy.getByTestId('BSlider-Y')
      .setSliderValue(-35);
    cy.getByTestId('BSlider-Y')
      .should('have.value', -35);
    cy.wait(1000);
    cy.getByTestId('BSlider-Scale')
    .setSliderValue(2);
    cy.getByTestId('BSlider-Scale')
      .should('have.value', 2);
    cy.wait(1000);
    cy.getByTestId('preview').click();
    cy.wait(6000);
    cy.getByTestId('BSlider-Delay')
    .setSliderValue(3);
    cy.getByTestId('BSlider-Delay')
      .should('have.value', 3);
    cy.wait(700);
    cy.getByTestId('Sidebar-Replay')
      .click({ force: true})
    cy.wait(700);
    cy.getByTestId('preview').click();
    cy.wait(10000);
    cy.getByTestId('BSlider-X')
      .setSliderValue(5);
    cy.getByTestId('BSlider-X')
      .should('have.value', 5);
    cy.wait(1000);
    cy.getByTestId('BSlider-X')
      .setSliderValue(15);
    cy.getByTestId('BSlider-X')
      .should('have.value', 15);
    cy.wait(1000);
    cy.getByTestId('BSlider-X')
      .setSliderValue(25);
    cy.getByTestId('BSlider-X')
      .should('have.value', 25);
    cy.wait(1000);
    cy.getByTestId('BSlider-X')
      .setSliderValue(35);
    cy.getByTestId('BSlider-X')
      .should('have.value', 35);
    cy.wait(10000);
    cy.getByTestId('Sidebar-Replay')
      .click({ force: true})
    cy.wait(700);
    cy.wait(4000);
    cy.getByTestId('preview').click();
    cy.wait(1000);
  })
});
