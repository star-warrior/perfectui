import { Router } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import client from "../db/redis_client.js";

const router = Router();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    // You can save user info to DB here
    client.set(`user:${profile.id}`, JSON.stringify({
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
    }));
    done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Start OAuth flow
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback
router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    async (req, res) => {

        const cachedResponse = JSON.parse(await client.get(`user:${req.user.id}`))
        console.log(cachedResponse);
        // Redirect to frontend with user info or set a cookie
        res.redirect("http://localhost:5173?user=" + encodeURIComponent(JSON.stringify(cachedResponse)));
    }
);

// Logout
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("http://localhost:5173");
    });
});

// Get current user profile
router.get("/profile", async (req, res) => {
    if (req.isAuthenticated() && req.user) {
        try {
            const cachedResponse = JSON.parse(await client.get(`user:${req.user.id}`));
            res.json({ user: cachedResponse });
        } catch {
            res.json({ user: null });
        }
    } else {
        res.json({ user: null });
    }
});

export default router;