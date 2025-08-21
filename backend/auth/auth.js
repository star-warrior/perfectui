import { Router } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const router = Router();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    // You can save user info to DB here
    done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Start OAuth flow
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback
router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        // Redirect to frontend with user info or set a cookie
        res.redirect("http://localhost:5173?user=" + encodeURIComponent(JSON.stringify(req.user)));
    }
);

// Logout
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("http://localhost:5173");
    });
});

export default router;