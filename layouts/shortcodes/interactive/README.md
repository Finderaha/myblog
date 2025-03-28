# 交互式演示组件

本目录包含博客中使用的各种交互式演示组件。这些组件使用Hugo的shortcodes功能实现，方便在文章中嵌入丰富的交互内容。

## 使用方法

在Markdown文章中，可以通过以下方式使用交互式演示：

### 单独使用各演示组件

```markdown
{{< interactive/kmeans/basic.html >}}
{{< interactive/kmeans/distribution.html >}}
{{< interactive/kmeans/image.html >}}
```

### 使用统一入口

```markdown
{{< interactive kmeans-basic >}}
{{< interactive kmeans-distribution >}}
{{< interactive kmeans-image >}}
```

## 目录结构

```
interactive/
├── common/               # 公共资源
│   ├── styles.html       # 公共样式
│   └── utils.js          # 公共JavaScript工具
├── kmeans/               # K-means算法演示
│   ├── basic.html        # 基本原理演示
│   ├── distribution.html # 数据分布演示
│   └── image.html        # 图像像素化演示
├── template.html         # 新演示组件模板
└── README.md             # 本说明文件
```

## 添加新演示组件

创建新的交互式演示组件，步骤如下：

1. 在`interactive/`目录下创建新的子目录，如`interactive/newdemo/`
2. 复制`template.html`作为起点，修改其中的HTML、CSS和JavaScript
3. 如需使用公共资源，可引用`common/`目录下的文件
4. 在`interactive.html`中添加对新组件的支持

示例:

```html
<!-- 在interactive.html中添加 -->
{{ if eq $type "newdemo-basic" }}
  {{ partial "shortcodes/interactive/newdemo/basic.html" . }}
{{ end }}
```

## 最佳实践

1. 保持JavaScript和CSS模块化，避免全局命名冲突
2. 为每个演示组件使用唯一的ID，防止DOM冲突
3. 使用响应式设计，确保在移动设备上也能良好显示
4. 添加适当的注释和文档，方便日后维护
5. 使用公共工具和样式，避免代码重复

## 故障排除

如果交互式演示无法正常显示，请检查:

1. 确保Hugo配置中已启用`unsafe = true`
2. 检查浏览器控制台是否有JavaScript错误
3. 验证所有资源路径是否正确
4. 检查ID是否唯一，避免DOM冲突 