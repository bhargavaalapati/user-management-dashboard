import { describe, it, expect } from 'vitest';
import { validateUserForm } from './validators';

describe('validateUserForm', () => {
    it('should return errors when fields are empty', () => {
        const emptyForm = { firstName: '', lastName: '', email: '', department: '' };
        const errors = validateUserForm(emptyForm);

        expect(errors.firstName).toBe('First Name is required');
        expect(errors.lastName).toBe('Last Name is required');
        expect(errors.email).toBe('Email is required');
        expect(errors.department).toBe('Department is required');
    });

    it('should return an error for an invalid email format', () => {
        const invalidEmailForm = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe-at-gmail.com',
            department: 'IT'
        };
        const errors = validateUserForm(invalidEmailForm);

        expect(errors.email).toBe('Invalid email format');
        expect(errors.firstName).toBeUndefined(); // Should have no error
    });

    it('should return no errors for a fully valid form', () => {
        const validForm = {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            department: 'Engineering'
        };
        const errors = validateUserForm(validForm);

        expect(Object.keys(errors).length).toBe(0);
    });
});