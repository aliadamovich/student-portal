import { LoginForm } from 'features/auth/ui/loginForm'
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from 'test/utils'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { PATH } from 'app/routes/router'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom')
	return {
		...actual,
		useNavigate: () => mockNavigate,
	}
})

describe('LoginForm', () => {
	it('should render login form', () => {
		renderWithProviders(<LoginForm />)

		expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
	})

	it('should login successfully with valid credentials', async () => {
		const user = userEvent.setup()
		renderWithProviders(<LoginForm />)

		const username = screen.getByLabelText(/username/i)
		const password = screen.getByLabelText(/password/i)
		const button = screen.getByRole('button', { name: /sign in/i })

		await user.type(username, 'student123')
		await user.type(password, '123')
		await user.click(button)

		await waitFor(() => {
			expect(mockNavigate).toHaveBeenCalledWith(PATH.ROOT)
		})
	})

	it('should show error message with invalid credentials', async () => {
		const user = userEvent.setup()
		renderWithProviders(<LoginForm />)

		const username = screen.getByLabelText(/username/i)
		const password = screen.getByLabelText(/password/i)
		const button = screen.getByRole('button', { name: /sign in/i })

		await user.type(username, 'invalid')
		await user.type(password, '321')

		await user.click(button)

		const errorMessage = await screen.getByRole('alert')
		expect(errorMessage).toBeInTheDocument()
	})

	it.todo('should disable button while loading', async () => {
		const user = userEvent.setup()
		renderWithProviders(<LoginForm />)

		const username = screen.getByLabelText(/username/i)
		const password = screen.getByLabelText(/password/i)
		const button = screen.getByRole('button', { name: /sign in/i })

		await user.type(username, 'student123')
		await user.type(password, '123')
		await user.click(button)

		expect(button).toBeDisabled()
		expect(screen.getByText(/signing in/i)).toBeInTheDocument()
	})

	it('should require student ID', async () => {
		const user = userEvent.setup()
		renderWithProviders(<LoginForm />)

		const password = screen.getByLabelText(/password/i)
		const button = screen.getByRole('button', { name: /sign in/i })

		await user.type(password, 'bla bla')

		await user.click(button)

		expect(screen.getByText(/username is required/i)).toBeInTheDocument()
	})

	it('should require password', async () => {
		const user = userEvent.setup()
		renderWithProviders(<LoginForm />)

		const username = screen.getByLabelText(/username/i)
		const button = screen.getByRole('button', { name: /sign in/i })

		await user.type(username, 'bla bla')

		await user.click(button)

		expect(screen.getByText(/password is required/i)).toBeInTheDocument()
	})
})
