import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../../db";
import { comparePassword, createToken } from "./auth";

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
      session: false,
    },
    async (req, username, password, done) => {
      if (!username || !password) {
        return done(null, false, { message: "Invalid credentials" });
      }
      const customer = await prisma.customer.findFirst({
        where: {
          OR: [
            {
              phone: username,
            },
            {
              email: username,
            },
          ],
        },
      });
      if (!customer) {
        return done(null, false, { message: "Invalid credentials" });
      }
      if (!comparePassword(password, customer.password)) {
        return done(null, false, { message: "Invalid credentials" });
      }
      return done(null, {
        token: createToken(customer),
        customer: {
          id: customer.id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
        },
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      const customer = await prisma.customer.findUnique({
        where: {
          id: payload.id,
        },
      });

      if (!customer) {
        return done(null, false, { message: "Invalid credentials" });
      }

      return done(null, {
        token: createToken(customer),
        customer: {
          id: customer.id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
        },
      });
    }
  )
);

export default passport;
