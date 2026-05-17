'use client';

import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { TeamboticsSVGLogo } from '@/components/layout/TeamboticsSVGLogo';
import { Button } from '@/components/ui/Button';

type LoginGateProps = {
  title?: string;
  description?: string;
  onLogin: (password: string) => Promise<boolean>;
  isLoggingIn: boolean;
  error: string | null;
  isConfigured: boolean | null;
};

export default function LoginGate({
  title = 'Admin Login',
  description = 'Enter the admin password to continue.',
  onLogin,
  isLoggingIn,
  error,
  isConfigured,
}: LoginGateProps) {
  const [password, setPassword] = useState('');

  return (
    <div className="admin-login-shell">
      <div className="admin-login-card">
        <div>
          <div className="admin-brand admin-brand--login">
            <TeamboticsSVGLogo />
            <div>
              <p className="admin-brand__label">Teambotics</p>
              <p className="admin-brand__context">Admin</p>
            </div>
          </div>
          <p className="admin-login-label">{title}</p>
          <p className="admin-login-description">{description}</p>
        </div>

        <div className="admin-login-form">
          <label className="admin-login-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="admin-login-input"
            />
          </label>

          {error ? (
            <div className="admin-login-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          ) : null}

          {isConfigured === false ? (
            <div className="admin-login-error">
              <AlertCircle size={16} />
              <span>Admin password is not configured.</span>
            </div>
          ) : null}

          <Button
            className="admin-login-button"
            onClick={() => onLogin(password)}
            variant="primary"
          >
            {isLoggingIn ? 'Signing in…' : 'Sign in'}
          </Button>
        </div>
      </div>
    </div>
  );
}
