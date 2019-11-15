# frozen_string_literal: true

class Auth0Controller < ApplicationController
  skip_before_action :authenticate_user!, :verify_authenticity_token

  include Auth0Helper

  def callback
    # Store the user token that came from Auth0 and the IdP
    # Auth0Helper#auth0_session
    self.auth0_session = request.env['omniauth.auth'].credentials.id_token

    # Redirect to the URL you want after successful auth
    redirect_to home_path
  end

  def remove_auth0_session
    # Invalidate auth0 session (https://auth0.com/docs/sessions/concepts/session-layers)
    redirect_to auth0_signout_url
  end

  def request_password_reset
    email = params.dig("user", "email")
    return if email.blank?

    # Send them a password reset email via Auth0 if enabled or the legacy Devise flow.
    if get_app_config(AppConfig::USE_AUTH0_FOR_NEW_USERS) == "1"
      User.send_auth0_password_reset_email(email)
      redirect_to auth0_login_url
    else
      # DEPRECATED: Legacy Devise flow. Remove block after migrating to Auth0.
      user = User.find_by(email: email)
      if user
        user.send_reset_password_instructions
      end
      # Old login page
      redirect_to new_user_session_path
    end
  end
end