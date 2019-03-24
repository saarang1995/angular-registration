export interface AuthResponse {
    status: "Authorized" | "Incorrect Password" | "Not Registered";
}