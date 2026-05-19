'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertCircle, Loader2, LogOut, Plus, Pencil, Trash2, Eye, EyeOff, ChevronLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TeamboticsSVGLogo } from '@/components/layout/TeamboticsSVGLogo';
import { Button } from '@/components/ui/Button';
import LoginGate from '@/components/admin/common/LoginGate';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  author: string;
  tags: string[];
  status: 'draft' | 'published';
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

type View = 'list' | 'editor';

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function formatDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function BlogAdminPage() {
  // --- Auth state ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAuthConfigured, setIsAuthConfigured] = useState<boolean | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // --- Post list state ---
  const [view, setView] = useState<View>('list');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  // --- Editor state ---
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCoverImageUrl, setFormCoverImageUrl] = useState('');
  const [formAuthor, setFormAuthor] = useState('Nikhil Khedkar');
  const [formTags, setFormTags] = useState('');
  const [formStatus, setFormStatus] = useState<'draft' | 'published'>('draft');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // --- Auth effects ---
  useEffect(() => {
    void checkSession();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      void loadPosts();
    }
  }, [isAuthenticated]);

  async function checkSession() {
    try {
      const res = await fetch('/api/admin/session');
      const data = (await res.json()) as { authenticated: boolean; configured: boolean };
      setIsAuthConfigured(data.configured ?? null);
      setIsAuthenticated(data.authenticated ?? false);
    } catch {
      setIsAuthenticated(false);
    }
  }

  async function login(password: string): Promise<boolean> {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (data.ok) {
        setIsAuthenticated(true);
        return true;
      }
      setLoginError(data.error ?? 'Invalid password.');
      return false;
    } catch {
      setLoginError('Network error. Please try again.');
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
  }

  // --- CRUD ---
  async function loadPosts() {
    setIsLoading(true);
    setListError(null);
    try {
      const res = await fetch('/api/admin/blog/posts');
      const data = (await res.json()) as { posts?: BlogPost[]; error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Failed to load posts.');
      setPosts(data.posts ?? []);
    } catch (err) {
      setListError(err instanceof Error ? err.message : 'Failed to load posts.');
    } finally {
      setIsLoading(false);
    }
  }

  async function savePost() {
    setSaveError(null);
    setIsSaving(true);
    const body = {
      title: formTitle,
      slug: formSlug,
      excerpt: formExcerpt,
      content: formContent,
      cover_image_url: formCoverImageUrl,
      author: formAuthor,
      tags: formTags.split(',').map((t) => t.trim()).filter(Boolean),
      status: formStatus,
    };

    try {
      const res = editingPost
        ? await fetch(`/api/admin/blog/posts/${editingPost.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
        : await fetch('/api/admin/blog/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });

      const data = (await res.json()) as { ok?: boolean; post?: BlogPost; error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Failed to save post.');

      await loadPosts();
      goToList();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save post.');
    } finally {
      setIsSaving(false);
    }
  }

  async function deletePost(id: string) {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/admin/blog/posts/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? 'Failed to delete post.');
      }
      await loadPosts();
    } catch (err) {
      setListError(err instanceof Error ? err.message : 'Failed to delete post.');
    }
  }

  async function togglePublish(post: BlogPost) {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/admin/blog/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? 'Failed to update status.');
      }
      await loadPosts();
    } catch (err) {
      setListError(err instanceof Error ? err.message : 'Failed to update status.');
    }
  }

  // --- Editor helpers ---
  function openNewPost() {
    setEditingPost(null);
    setFormTitle('');
    setFormSlug('');
    setFormExcerpt('');
    setFormContent('');
    setFormCoverImageUrl('');
    setFormAuthor('Nikhil Khedkar');
    setFormTags('');
    setFormStatus('draft');
    setSlugManuallyEdited(false);
    setSaveError(null);
    setShowPreview(false);
    setView('editor');
  }

  function openEdit(post: BlogPost) {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormExcerpt(post.excerpt);
    setFormContent(post.content);
    setFormCoverImageUrl(post.cover_image_url ?? '');
    setFormAuthor(post.author);
    setFormTags(post.tags.join(', '));
    setFormStatus(post.status);
    setSlugManuallyEdited(true);
    setSaveError(null);
    setShowPreview(false);
    setView('editor');
  }

  function goToList() {
    setView('list');
    setEditingPost(null);
    setSaveError(null);
  }

  function handleTitleChange(value: string) {
    setFormTitle(value);
    if (!slugManuallyEdited) {
      setFormSlug(toSlug(value));
    }
  }

  // --- Loading / Auth gates ---
  if (isAuthenticated === null) {
    return (
      <div className="admin-login-shell">
        <Loader2 className="admin-loader-spinner" size={32} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginGate
        title="Blog Admin"
        description="Enter the admin password to manage blog posts."
        onLogin={login}
        isLoggingIn={isLoggingIn}
        error={loginError}
        isConfigured={isAuthConfigured}
      />
    );
  }

  // --- Main render ---
  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <Link href="/" className="admin-back-link">← Back to site</Link>
          <div className="admin-brand admin-brand--header">
            <TeamboticsSVGLogo />
            <div>
              <p className="admin-brand__label">Teambotics</p>
              <p className="admin-brand__context">Admin</p>
            </div>
          </div>
          <h1>Blog Admin</h1>
          <p className="admin-subtitle">Create, edit, and publish blog posts.</p>
        </div>
        <div className="admin-actions">
          <Link href="/admin/chatbot" className="admin-link-button">Chatbot admin</Link>
          <Link href="/admin/theme" className="admin-link-button">Theme admin</Link>
          <button type="button" className="admin-logout" onClick={logout}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>

      <div className="admin-content">
        {view === 'list' ? (
          <div className="blog-admin-list">
            <div className="blog-admin-toolbar">
              <h2 className="blog-admin-toolbar__heading">Posts</h2>
              <Button variant="primary" onClick={openNewPost}>
                <Plus size={16} /> New post
              </Button>
            </div>

            {listError && (
              <div className="admin-notice admin-notice--error">
                <AlertCircle size={16} />
                <span>{listError}</span>
              </div>
            )}

            {isLoading ? (
              <div className="blog-admin-loading">
                <Loader2 size={24} className="admin-loader-spinner" />
                <span>Loading posts…</span>
              </div>
            ) : posts.length === 0 ? (
              <div className="blog-admin-empty">
                <p>No posts yet. Create your first post to get started.</p>
                <Button variant="primary" onClick={openNewPost}>
                  <Plus size={16} /> New post
                </Button>
              </div>
            ) : (
              <div className="blog-admin-table-container">
                <table className="blog-admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Published</th>
                      <th>Updated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td>
                          <span className="blog-admin-post-title">{post.title}</span>
                          <span className="blog-admin-post-slug">/{post.slug}</span>
                        </td>
                        <td>
                          <span className={`blog-admin-status blog-admin-status--${post.status}`}>
                            {post.status}
                          </span>
                        </td>
                        <td>{formatDate(post.published_at)}</td>
                        <td>{formatDate(post.updated_at)}</td>
                        <td>
                          <div className="blog-admin-action-group">
                            <button
                              type="button"
                              className="blog-admin-action"
                              title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                              onClick={() => void togglePublish(post)}
                            >
                              {post.status === 'published' ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                            <button
                              type="button"
                              className="blog-admin-action"
                              title="Edit"
                              onClick={() => openEdit(post)}
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              type="button"
                              className="blog-admin-action blog-admin-action--danger"
                              title="Delete"
                              onClick={() => void deletePost(post.id)}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="blog-admin-editor">
            <div className="blog-admin-editor__topbar">
              <button type="button" className="blog-admin-back" onClick={goToList}>
                <ChevronLeft size={16} /> Back to posts
              </button>
              <h2 className="blog-admin-editor__heading">
                {editingPost ? 'Edit post' : 'New post'}
              </h2>
              <div className="blog-admin-editor__topbar-actions">
                <button
                  type="button"
                  className="admin-link-button"
                  onClick={() => setShowPreview((v) => !v)}
                >
                  {showPreview ? <EyeOff size={15} /> : <Eye size={15} />}
                  {showPreview ? 'Hide preview' : 'Show preview'}
                </button>
              </div>
            </div>

            {saveError && (
              <div className="admin-notice admin-notice--error">
                <AlertCircle size={16} />
                <span>{saveError}</span>
              </div>
            )}

            <div className={`blog-admin-editor__body${showPreview ? ' blog-admin-editor__body--split' : ''}`}>
              <div className="blog-admin-editor__form">
                <div className="blog-admin-field">
                  <label className="blog-admin-label" htmlFor="post-title">Title</label>
                  <input
                    id="post-title"
                    type="text"
                    className="blog-admin-input"
                    value={formTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Post title"
                  />
                </div>

                <div className="blog-admin-field">
                  <label className="blog-admin-label" htmlFor="post-slug">Slug</label>
                  <input
                    id="post-slug"
                    type="text"
                    className="blog-admin-input"
                    value={formSlug}
                    onChange={(e) => {
                      setFormSlug(e.target.value);
                      setSlugManuallyEdited(true);
                    }}
                    placeholder="url-friendly-slug"
                  />
                </div>

                <div className="blog-admin-field">
                  <label className="blog-admin-label" htmlFor="post-excerpt">Excerpt</label>
                  <textarea
                    id="post-excerpt"
                    className="blog-admin-textarea blog-admin-textarea--short"
                    value={formExcerpt}
                    onChange={(e) => setFormExcerpt(e.target.value)}
                    placeholder="Short summary shown in post listings"
                    rows={3}
                  />
                </div>

                <div className="blog-admin-field-row">
                  <div className="blog-admin-field">
                    <label className="blog-admin-label" htmlFor="post-author">Author</label>
                    <input
                      id="post-author"
                      type="text"
                      className="blog-admin-input"
                      value={formAuthor}
                      onChange={(e) => setFormAuthor(e.target.value)}
                    />
                  </div>
                  <div className="blog-admin-field">
                    <label className="blog-admin-label" htmlFor="post-status">Status</label>
                    <select
                      id="post-status"
                      className="blog-admin-input"
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as 'draft' | 'published')}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                <div className="blog-admin-field">
                  <label className="blog-admin-label" htmlFor="post-tags">Tags</label>
                  <input
                    id="post-tags"
                    type="text"
                    className="blog-admin-input"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="automation, robotics, ai (comma-separated)"
                  />
                </div>

                <div className="blog-admin-field">
                  <label className="blog-admin-label" htmlFor="post-cover">Cover image URL</label>
                  <input
                    id="post-cover"
                    type="url"
                    className="blog-admin-input"
                    value={formCoverImageUrl}
                    onChange={(e) => setFormCoverImageUrl(e.target.value)}
                    placeholder="https://..."
                  />
                </div>

                <div className="blog-admin-field blog-admin-field--grow">
                  <label className="blog-admin-label" htmlFor="post-content">Content (Markdown)</label>
                  <textarea
                    id="post-content"
                    className="blog-admin-textarea blog-admin-textarea--content"
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Write your post in Markdown…"
                  />
                </div>

                <div className="blog-admin-editor__actions">
                  <Button variant="ghost" onClick={goToList} disabled={isSaving}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => void savePost()} disabled={isSaving}>
                    {isSaving ? 'Saving…' : editingPost ? 'Save changes' : 'Create post'}
                  </Button>
                </div>
              </div>

              {showPreview && (
                <div className="blog-admin-preview">
                  <p className="blog-admin-preview__label">Preview</p>
                  <div className="blog-admin-preview__content">
                    {formContent ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{formContent}</ReactMarkdown>
                    ) : (
                      <p className="blog-admin-preview__empty">Nothing to preview yet.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
