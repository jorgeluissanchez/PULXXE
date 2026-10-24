<?xml version="1.0" encoding="UTF-8"?>
<!-- Vista legible del sitemap en el navegador. Google lee el XML; esta hoja solo da formato. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <title>Sitemap · Pulxxe</title>
        <style>
          body { margin: 0; padding: 40px 16px; background: #faf8f3; color: #052242; font: 15px/1.5 system-ui, sans-serif; }
          main { max-width: 1040px; margin: 0 auto; }
          h1 { margin: 0 0 4px; font-size: 28px; }
          p { margin: 0 0 24px; color: #5b6470; }
          table { width: 100%; border-collapse: collapse; background: #fff; }
          th, td { padding: 10px 12px; border-bottom: 1px solid #ece8de; text-align: left; vertical-align: top; }
          th { background: #052242; color: #fff; font-size: 13px; text-transform: uppercase; letter-spacing: .04em; }
          a { color: #052242; }
          .n { text-align: right; white-space: nowrap; }
          .bar { display: inline-block; width: 24px; height: 3px; margin-right: 8px; vertical-align: middle; background: #faad01; }
        </style>
      </head>
      <body>
        <main>
          <xsl:choose>
            <xsl:when test="s:sitemapindex">
              <h1><span class="bar"></span>Índice de sitemaps</h1>
              <p><xsl:value-of select="count(s:sitemapindex/s:sitemap)" /> sitemap(s).</p>
              <table>
                <tr><th>Sitemap</th><th class="n">Última modificación</th></tr>
                <xsl:for-each select="s:sitemapindex/s:sitemap">
                  <tr>
                    <td><a href="{s:loc}"><xsl:value-of select="s:loc" /></a></td>
                    <td class="n"><xsl:value-of select="substring(s:lastmod, 1, 10)" /></td>
                  </tr>
                </xsl:for-each>
              </table>
            </xsl:when>
            <xsl:otherwise>
              <h1><span class="bar"></span>Sitemap de pulxxe.co</h1>
              <p>
                <xsl:value-of select="count(s:urlset/s:url)" /> páginas ·
                <xsl:value-of select="count(s:urlset/s:url/image:image)" /> imágenes ·
                <xsl:value-of select="count(s:urlset/s:url/video:video)" /> videos
              </p>
              <table>
                <tr><th>Página</th><th class="n">Imágenes</th><th class="n">Videos</th><th class="n">Última modificación</th></tr>
                <xsl:for-each select="s:urlset/s:url">
                  <tr>
                    <td><a href="{s:loc}"><xsl:value-of select="s:loc" /></a></td>
                    <td class="n"><xsl:value-of select="count(image:image)" /></td>
                    <td class="n"><xsl:value-of select="count(video:video)" /></td>
                    <td class="n"><xsl:value-of select="substring(s:lastmod, 1, 10)" /></td>
                  </tr>
                </xsl:for-each>
              </table>
            </xsl:otherwise>
          </xsl:choose>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
