#include <node.h>
#include <v8.h>
#include <phidget21.h>

using namespace v8;

// ------------------------------------------
// Globals
// ------------------------------------------

CPhidgetBridgeHandle bridge = 0;

// ------------------------------------------
// Event handlers
// ------------------------------------------

int CCONV AttachHandler(CPhidgetHandle ADVSERVO, void *userptr)
{
    int serialNo;
    const char *name;

    CPhidget_getDeviceName (ADVSERVO, &name);
    CPhidget_getSerialNumber(ADVSERVO, &serialNo);
    printf("%s %10d attached!\n", name, serialNo);

    return 0;
}

int CCONV DetachHandler(CPhidgetHandle ADVSERVO, void *userptr)
{
    int serialNo;
    const char *name;

    CPhidget_getDeviceName (ADVSERVO, &name);
    CPhidget_getSerialNumber(ADVSERVO, &serialNo);
    printf("%s %10d detached!\n", name, serialNo);

    return 0;
}

int CCONV ErrorHandler(CPhidgetHandle ADVSERVO, void *userptr, int ErrorCode, const char *Description)
{
    printf("Error handled. %d - %s\n", ErrorCode, Description);
    return 0;
}

int CCONV BridgeDataHandler(CPhidgetBridgeHandle ADVSERVO, void *usrptr, int Index, double Value)
{
    printf("Bridge: %d > Current Data: %f\n", Index, Value);
    return 0;
}

int display_properties(CPhidgetBridgeHandle phid)
{
    int serialNo, version;
    int numSensor, rateMax, rateMin;
    const char* ptr;

    CPhidget_getDeviceType((CPhidgetHandle)phid, &ptr);
    CPhidget_getSerialNumber((CPhidgetHandle)phid, &serialNo);
    CPhidget_getDeviceVersion((CPhidgetHandle)phid, &version);

    CPhidgetBridge_getInputCount((CPhidgetBridgeHandle) phid, &numSensor);
    CPhidgetBridge_getDataRateMax((CPhidgetBridgeHandle) phid, &rateMax);
    CPhidgetBridge_getDataRateMin((CPhidgetBridgeHandle) phid, &rateMin);

    printf("%s\n", ptr);
    printf("Serial Number: %10d\nVersion: %8d\n# Sensor: %d\nData Rate: %d ~ %d\n",
                    serialNo, version, numSensor, rateMax, rateMin);

    return 0;
}

// ------------------------------------------
// Method abstractions
// ------------------------------------------

Handle<Value>
attach(const Arguments& args) 
{
    HandleScope scope;

    int result;
    const char *err;

    // Create the bridge object
    CPhidgetBridge_create(&bridge);

    // Register event handlers
    CPhidget_set_OnAttach_Handler((CPhidgetHandle)bridge, AttachHandler, NULL);
    CPhidget_set_OnDetach_Handler((CPhidgetHandle)bridge, DetachHandler, NULL);
    CPhidget_set_OnError_Handler((CPhidgetHandle)bridge, ErrorHandler, NULL);

    // Registers a callback that will run when the sensor value is changed.
    // Requires the handle for the Phidget, the function that will be called,
    // and an arbitrary pointer that will be supplied to the callback function (may be NULL).
    //CPhidgetBridge_set_OnBridgeData_Handler((CPhidgetBridgeHandle)bridge, BridgeDataHandler, NULL);

    // Open the device for connections
    CPhidget_open((CPhidgetHandle)bridge, -1);

    // Get the program to wait for an advanced bridge device to be attached
    printf("Waiting for Phidget to be attached....\n");
    if((result = CPhidget_waitForAttachment((CPhidgetHandle)bridge, 10000)))
    {
        CPhidget_getErrorDescription(result, &err);
        return ThrowException(Exception::Error(String::New("Could not attach to device.")));
    }

    // Display the properties of the attached device
    display_properties(bridge);

    return scope.Close(Integer::NewFromUnsigned(0));
}

Handle<Value>
close(const Arguments& args)
{
    HandleScope scope;

    CPhidget_close((CPhidgetHandle)bridge);
    CPhidget_delete((CPhidgetHandle)bridge);
    printf("Phidget Bridge is closed.\n");

    return scope.Close(Integer::NewFromUnsigned(0));
}

Handle<Value>
getValue(const Arguments& args)
{
    double value;

    HandleScope scope;
    CPhidgetBridge_getBridgeValue(bridge, args[0]->Int32Value(), &value);
    return scope.Close(Number::New(value));
}

Handle<Value>
getMax(const Arguments& args)
{
    double max;

    HandleScope scope;
    CPhidgetBridge_getBridgeMax(bridge, args[0]->Int32Value(), &max);
    return scope.Close(Integer::NewFromUnsigned(max));
}

Handle<Value>
getMin(const Arguments& args)
{
    double min;

    HandleScope scope;
    CPhidgetBridge_getBridgeMin(bridge, args[0]->Int32Value(), &min);
    return scope.Close(Integer::NewFromUnsigned(min));
}

Handle<Value>
setEnabled(const Arguments& args)
{
    HandleScope scope;
    CPhidgetBridge_setEnabled(bridge, args[0]->Int32Value(), args[1]->Int32Value());
    return scope.Close(Integer::NewFromUnsigned(0));
}

Handle<Value>
getEnabled(const Arguments& args)
{
    int enabled;
    HandleScope scope;
    CPhidgetBridge_getEnabled(bridge, args[0]->Int32Value(), &enabled);
    if(enabled)
        return scope.Close(Boolean::New(true));
    else
        return scope.Close(Boolean::New(false));
}

Handle<Value>
setGain(const Arguments& args)
{
    CPhidgetBridge_Gain gain;
    switch(args[1]->Int32Value()) {
        case 1:
            gain = PHIDGET_BRIDGE_GAIN_1;
            break;
        case 2:
            gain = PHIDGET_BRIDGE_GAIN_8;
            break;
        case 3:
            gain = PHIDGET_BRIDGE_GAIN_16;
            break;
        case 4:
            gain = PHIDGET_BRIDGE_GAIN_32;
            break;
        case 5:
            gain = PHIDGET_BRIDGE_GAIN_64;
            break;
        case 6:
            gain = PHIDGET_BRIDGE_GAIN_128;
            break;
        default:
            gain = PHIDGET_BRIDGE_GAIN_UNKNOWN;
    }
    HandleScope scope;
    CPhidgetBridge_setGain(bridge, args[0]->Int32Value(), gain);
    return scope.Close(Integer::NewFromUnsigned(0));
}

Handle<Value>
getGain(const Arguments& args)
{
    CPhidgetBridge_Gain gain;
    HandleScope scope;
    CPhidgetBridge_getGain(bridge, args[0]->Int32Value(), &gain);
    return scope.Close(Integer::NewFromUnsigned(gain));
}

Handle<Value>
setDataRate(const Arguments& args)
{
    HandleScope scope;
    CPhidgetBridge_setDataRate(bridge, args[0]->Int32Value());
    return scope.Close(Integer::NewFromUnsigned(0));
}

Handle<Value>
getDataRate(const Arguments& args)
{
    int dataRate;
    HandleScope scope;
    CPhidgetBridge_getDataRate(bridge, &dataRate);
    return scope.Close(Integer::NewFromUnsigned(dataRate));
}

// ------------------------------------------
// Module
// ------------------------------------------

void init(Handle<Object> target) 
{
    // Connection
    target->Set(String::New("attach"), FunctionTemplate::New(attach)->GetFunction());
    target->Set(String::New("close"), FunctionTemplate::New(close)->GetFunction());

    // Bridge manipulation
    target->Set(String::New("setEnabled"), FunctionTemplate::New(setEnabled)->GetFunction());
    target->Set(String::New("setGain"), FunctionTemplate::New(setGain)->GetFunction());
    target->Set(String::New("setDataRate"), FunctionTemplate::New(setDataRate)->GetFunction());

    // Status
    target->Set(String::New("getValue"), FunctionTemplate::New(getValue)->GetFunction());
    target->Set(String::New("getMax"), FunctionTemplate::New(getMax)->GetFunction());
    target->Set(String::New("getMin"), FunctionTemplate::New(getMin)->GetFunction());
    target->Set(String::New("getEnabled"), FunctionTemplate::New(getEnabled)->GetFunction());
    target->Set(String::New("getGain"), FunctionTemplate::New(getGain)->GetFunction());
    target->Set(String::New("getDataRate"), FunctionTemplate::New(getDataRate)->GetFunction());
}

NODE_MODULE(binding_bridge, init);
