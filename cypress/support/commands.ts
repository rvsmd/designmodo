/// <reference types="cypress" />
import "cypress-file-upload";
import "cypress-localstorage-commands";

const specialSymbols = ["^", "*", "$"];

/**
 * usage:
 * specify data-testid="blah" on some element in jsx, then retrieve with cy.getByTestId("blah")
 * to target element inside some other element:
 * space-separate data-testid attributes from parent to child, e.g. cy.getByTestId("parentid childid")
 */
Cypress.Commands.add("getByTestId", (selector: string) => {
	const selectors = selector
		.split(" ")
		.map((x) => x.trim())
		.filter((x) => x)
		.map((s) => {
			for (const symbol of specialSymbols) {
				if (s.includes(symbol)) {
					return `[data-testid${symbol}=${s.replace(symbol, "")}]`;
				}
			}
			return `[data-testid=${s}]`;
		})
		.join(" ");
	return cy.get(selectors);
});

Cypress.Commands.add("closePopups", () => {
	cy.get("body").trigger("keydown", { keyCode: 27 });
	cy.wait(100);
	cy.get("body").trigger("keyup", { keyCode: 27 });
});

// testid is set on TextField usually, so to check value need to dig into underlying input
Cypress.Commands.add("validateInputValue", (selector: string, value: any) => {
	cy.getByTestId(selector).within(() => {
		cy.get("input").should("have.value", value);
	});
});

Cypress.Commands.add('setSliderValue', { prevSubject: 'element' },
    (subject, value) => {
        const element = subject[0]

        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value'
        )?.set
        
        nativeInputValueSetter?.call(element, value)
        element.dispatchEvent(new Event('input', { bubbles: true }))
    }
)

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			getByTestId(value: string): Chainable<Subject>;
			closePopups: () => void;
			clickNextPage: () => void;
			clickPreviousPage: () => void;
			validateInputValue: (selector: string, value: any) => void;
			setSliderValue(value: number): Chainable<void>
		}
	}
}
