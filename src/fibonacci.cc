#include <nan.h>

using namespace v8;

class Fibonacci
{
private:
    int a, b;
public:
    explicit Fibonacci(Isolate* isolate) : a(0), b(1)
    {
        node::AddEnvironmentCleanupHook(isolate, deleteInst, this);
    }

    int next()
    {
        int c = b;
        b += a;
        return (a = c);
    }

    static void deleteInst(void* data)
    {
        delete static_cast<Fibonacci*>(data);
    }
};

static void get(const FunctionCallbackInfo<Value>& info)
{
    Fibonacci* data = reinterpret_cast<Fibonacci*>(info.Data().As<External>()->Value());
    Isolate* isolate = info.GetIsolate();

    Local<String> next = String::NewFromUtf8(isolate, std::to_string(data->next()).c_str());
    info.GetReturnValue().Set(next);
}

NODE_MODULE_INIT(Local<Object> exports, Local<Value> module, Local<Context> context) 
{
    Isolate* isolate = context->GetIsolate();
    Fibonacci* data = new Fibonacci(isolate);

    Local<External> external = External::New(isolate, data);

    exports->Set(   context,
                    String::NewFromUtf8(isolate, "get"), 
                    FunctionTemplate::New(isolate, get, external)->GetFunction(context).ToLocalChecked()).FromJust();
}
