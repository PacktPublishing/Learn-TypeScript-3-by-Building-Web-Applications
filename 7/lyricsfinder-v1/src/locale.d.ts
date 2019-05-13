// For the curious: this is a workaround for https://github.com/ElemeFE/element/issues/9084
// Without this, impossible to change the default (Chinese) language of Element with TypeScript without
// setting noImplicitAny to false
declare module 'element-ui/lib/locale/lang/en' {
}
