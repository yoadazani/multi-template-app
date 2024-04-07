import {
    authData,
    authService,
    CSRF_SECRET,
    prismaMock,
    UserType,
} from '../setup/global'

import { app, Server, supertest, Test, TestAgent } from '../setup/e2e'

let request: TestAgent<Test>

describe('Given authController', () => {
    beforeEach(() => {
        request = supertest.agent(app)
    })

    describe('Given signup route', () => {
        it('Should return status 201 and user data', async () => {
            const res = await request
                .post('/api/v1/auth/signup')
                .send(authData.validSignupInfo)
            expect(res.status).toBe(201)

            expect(res.body.message).toBe('User created!')
            expect(res.body.data).toStrictEqual({})
        })
        it('Should return status 403 and error message and property', async () => {
            authData.invalidSignupInfo.forEach((user) => {
                Promise.all([
                    request.post('/api/v1/auth/signup').send(user),
                ]).then(([response]) => {
                    expect(response.status).toBe(403)

                    const errorMessage = response.body.error[0]
                    expect(errorMessage.statusType).toBe('Validation Error')
                    expect(errorMessage.error).toContain('is required')
                    expect(errorMessage.property).not.toBeNull()
                })
            })
        })
        it('Should return status 409 and error message and property', async () => {
            // Mock the Prisma Client's user.create method to throw an error
            prismaMock.user.findFirst.mockResolvedValue(
                authData.userData as UserType,
            )

            // Send a request to the signup route
            const response = await request
                .post('/api/v1/auth/signup')
                .send(authData.validSignupInfo)

            // Expect a 409 status code
            expect(response.status).toBe(409)

            const errorMessage = response.body.error[0]

            expect(errorMessage.statusType).toBe('Conflict')
            expect(errorMessage.error).toBe('User already exists!')
            expect(errorMessage.property).toBe('email')
        })
    })
    describe('Given login route', () => {
        it('should return status 200 and user data', async () => {
            // Mock the Prisma Client's user.create method to throw an error
            prismaMock.user.findFirst.mockResolvedValue(
                authData.userData as UserType,
            )

            const res = await request
                .post('/api/v1/auth/login')
                .send(authData.validLoginInfo)

            expect(res.status).toBe(200)
            expect(res.body.message).toBe('user logged in!')
            expect(res.body.data).toHaveProperty('token')
            expect(res.headers['set-cookie']).not.toBeNull()
            expect(res.headers['set-cookie'][0]).toContain('accessToken')
        })
        it('should return status 404 and error message', async () => {
            const res = await request
                .post('/api/v1/auth/login')
                .send(authData.validLoginInfo)

            const errorMessage = res.body.error[0]

            expect(res.status).toBe(404)
            expect(errorMessage.statusType).toBe('Authentication Error')
            expect(errorMessage.error).toBe('User not found!')
        })
        it('should return status 403 and error message and property', async () => {
            authData.invalidLoginInfo.forEach((user) => {
                Promise.all([
                    request.post('/api/v1/auth/login').send(user),
                ]).then(([response]) => {
                    expect(response.status).toBe(403)

                    const errorMessage = response.body.error[0]

                    expect(errorMessage.statusType).toBe('Validation Error')
                    expect(errorMessage.error).toEqual(
                        expect.stringMatching(/is required|is not allowed/),
                    )
                    expect(errorMessage.property).not.toBeNull()
                })
            })
        })
    })
    describe('Given logout route', () => {
        it('should return status 200 and clear accessToken cookie', async () => {
            const res = await request.get('/api/v1/auth/logout')

            expect(res.status).toBe(200)
            expect(res.body.message).toBe('user logged out!')
            expect(res.headers['set-cookie'][0]).not.toHaveProperty(
                'accessToken',
            )
        })
    })
    describe('Given me route', () => {
        it('should return status 200 and user data', async () => {
            prismaMock.user.findUnique.mockResolvedValue(
                authData.userData as UserType,
            )

            const mockToken = authService.createToken(authData.userData)

            const res = await request
                .get('/api/v1/auth/me')
                .set('Cookie', [`accessToken=${mockToken}`])

            expect(res.status).toBe(200)
            expect(res.body.message).toBe('User info!')
            expect(res.body.data).toHaveProperty('user')
            expect(res.body.data.user.id).toBe(authData.userData.id)
            expect(res.body.data.user.email).toBe(authData.userData.email)
        })
        it('should return status 401 and error message', async () => {
            authData.invalidTokens.forEach((token) => {
                Promise.all([
                    request
                        .get('/api/v1/auth/me')
                        .set('Cookie', [`accessToken=${token}`]),
                ]).then(([response]) => {
                    expect(response.status).toBe(401)
                    const errorMessage = response.body.error[0]

                    expect(errorMessage.statusType).toBe('Unauthorized')
                    expect(errorMessage.error).toBe('User not authenticated!')

                    expect(
                        response.headers['set-cookie'][0],
                    ).not.toHaveProperty('accessToken')
                })
            })
        })
    })
    describe('Given forget password route', () => {
        it('should return status 200 and message', async () => {
            authData.validEmails.forEach((email) => {
                Promise.all([
                    request.get(`/api/v1/auth/forget-password/${email}`),
                ]).then(([response]) => {
                    expect(response.status).toBe(200)
                    expect(response.body.message).toBe(
                        'We have sent you an email with an OTP to confirm your email! Please check your email.',
                    )
                })
            })
        })
        it('should return status 403 and error message and property', () => {
            authData.invalidEmails.forEach((email) => {
                Promise.all([
                    request.get(`/api/v1/auth/forget-password/${email}`),
                ]).then(([response]) => {
                    expect(response.status).toBe(403)
                    const errorMessage = response.body.error[0]

                    expect(errorMessage.statusType).toBe('Validation Error')
                    expect(errorMessage.error).toEqual(
                        expect.stringMatching(
                            /must be a valid email|is not allowed/,
                        ),
                    )
                    expect(errorMessage.property).not.toBeNull()
                })
            })
        })
    })
    describe('Given confirm email route', () => {
        it('should return status 201 and message', async () => {
            const { csrfToken: mockCsrfToken } = authService.generateCSRFToken()

            prismaMock.user.findFirst.mockResolvedValue(
                authData.userData as UserType,
            )

            const res = await request.post('/api/v1/auth/confirm-email').send({
                ...authData.validConfirmEmailInfo,
                csrfToken: mockCsrfToken,
            })

            expect(res.status).toBe(201)
            expect(res.body.message).toBe('Your email is confirmed!')
            expect(res.body.data).toHaveProperty('user')
            expect(res.body.data.user.id).toBe(authData.userData.id)

            const secret = CSRF_SECRET.get('CSRF_SECRET')

            expect(secret).toBeUndefined()
        })
        it('should return status 403 and error message and property', (done) => {
            prismaMock.user.findFirst.mockResolvedValue(
                authData.userData as UserType,
            )

            const { csrfToken: mockCsrfToken } = authService.generateCSRFToken()

            request
                .post('/api/v1/auth/confirm-email')
                .send({
                    ...authData.invalidConfirmEmailInfo,
                    csrfToken: mockCsrfToken,
                })
                .expect((res) => {
                    expect(res.status).toBe(403)
                    const errorMessage = res.body.error[0]

                    expect(errorMessage.statusType).toBe('Validation Error')
                    expect(errorMessage.error).toEqual(
                        expect.stringMatching(
                            /must be a valid email|is not allowed|is required|OTP is not valid!/,
                        ),
                    )
                    expect(errorMessage.property).not.toBeNull()

                    const secret = CSRF_SECRET.get('CSRF_SECRET')

                    expect(secret).toBeUndefined()
                })
                .end(done)
        })
    })
    describe('Given reset password route', () => {
        it('should return status 200 and message and reset user password', async () => {
            const { csrfToken: mockCsrfToken } = authService.generateCSRFToken()

            prismaMock.user.findFirst.mockResolvedValue(
                authData.userData as UserType,
            )

            prismaMock.user.update.mockResolvedValue({
                ...authData.userData,
                password: authService.hashPassword(
                    authData.validResetPasswordInfo.newPassword,
                ),
                resetPasswordOTP: null,
                resetPasswordExpiration: null,
                password_updated_at: new Date(Date.now()),
            } as UserType)

            const res = await request.put('/api/v1/auth/reset-password').send({
                ...authData.validResetPasswordInfo,
                csrfToken: mockCsrfToken,
            })

            expect(res.status).toBe(200)
            expect(res.body.message).toBe('Password changed successfully!')
            expect(res.body.data).toHaveProperty('user')
            expect(res.body.data.user.id).toBe(authData.userData.id)
        })
        it('should return status 403 and error message', async () => {
            const { csrfToken: mockCsrfToken } = authService.generateCSRFToken()

            prismaMock.user.findFirst.mockResolvedValue(
                authData.userData as UserType,
            )

            const res = await request.put('/api/v1/auth/reset-password').send({
                ...authData.invalidResetPasswordInfo,
                csrfToken: mockCsrfToken,
            })

            expect(res.status).toBe(403)

            const errorMessage = res.body.error[0]

            expect(errorMessage.error).toEqual(
                expect.stringMatching(
                    /must be a valid email|is not allowed|is required/,
                ),
            )
            expect(errorMessage.statusType).toBe('Validation Error')
            expect(errorMessage.property).not.toBeNull()
        })
        it('should return status 404', async () => {
            const { csrfToken: mockCsrfToken } = authService.generateCSRFToken()

            const res = await request.put('/api/v1/auth/reset-password').send({
                ...authData.validResetPasswordInfo,
                csrfToken: mockCsrfToken,
            })

            expect(res.status).toBe(404)
            expect(res.body.error[0].error).toBe(
                'There is an error occurred! Please try again.',
            )
            expect(res.body.error[0].statusType).toBe('Reset Password')
            expect(res.body.error[0].property).toBeUndefined()
        })
    })

    afterAll(() => {
        Server.getHttpServer().close()
    })
})
