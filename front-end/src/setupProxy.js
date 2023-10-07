import { createProxyMiddleware } from 'http-proxy-middleware';

export default function SetupProxy(app) {
  app.use(
    '/api/',
    createProxyMiddleware({
      target: process.env.REACT_APP_BACKEND_URL,
      changeOrigin: true,
      pathRewrite: { '^/api/(.*)': '/api/$1' },
      onError(err, req, res, target) {
        res.status(504).json({
          message: 'Backend is not accessible'
        })
      }
    })
  );
};
