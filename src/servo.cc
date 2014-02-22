#include <node.h>
#include <v8.h>
#include <phidget21.h>

using namespace v8;

// ------------------------------------------
// Globals
// ------------------------------------------

CPhidgetAdvancedServoHandle servo = 0;

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

int CCONV PositionChangeHandler(CPhidgetAdvancedServoHandle ADVSERVO, void *usrptr, int Index, double Value)
{
    printf("Motor: %d > Current Position: %f\n", Index, Value);
    return 0;
}

int display_properties(CPhidgetAdvancedServoHandle phid)
{
    int serialNo, version, numMotors;
    const char* ptr;

    CPhidget_getDeviceType((CPhidgetHandle)phid, &ptr);
    CPhidget_getSerialNumber((CPhidgetHandle)phid, &serialNo);
    CPhidget_getDeviceVersion((CPhidgetHandle)phid, &version);

    CPhidgetAdvancedServo_getMotorCount (phid, &numMotors);

    printf("%s\n", ptr);
    printf("Serial Number: %10d\nVersion: %8d\n# Motors: %d\n", serialNo, version, numMotors);

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

    // Create the servo object
    CPhidgetAdvancedServo_create(&servo);

    // Register event handlers
    CPhidget_set_OnAttach_Handler((CPhidgetHandle)servo, AttachHandler, NULL);
    CPhidget_set_OnDetach_Handler((CPhidgetHandle)servo, DetachHandler, NULL);
    CPhidget_set_OnError_Handler((CPhidgetHandle)servo, ErrorHandler, NULL);

    // Registers a callback that will run when the motor position is changed.
    // Requires the handle for the Phidget, the function that will be called, and an arbitrary pointer that will be supplied to the callback function (may be NULL).
    CPhidgetAdvancedServo_set_OnPositionChange_Handler(servo, PositionChangeHandler, NULL);

    // Open the device for connections
    CPhidget_open((CPhidgetHandle)servo, -1);

    // Get the program to wait for an advanced servo device to be attached
    printf("Waiting for Phidget to be attached....\n");
    if((result = CPhidget_waitForAttachment((CPhidgetHandle)servo, 10000)))
    {
        CPhidget_getErrorDescription(result, &err);
        return ThrowException(Exception::Error(String::New("Could not attach to device.")));
    }

    // Display the properties of the attached device
    display_properties(servo);

    return scope.Close(Integer::NewFromUnsigned(0));
}

Handle<Value>
close(const Arguments& args)
{
    HandleScope scope;

    CPhidget_close((CPhidgetHandle)servo);
    CPhidget_delete((CPhidgetHandle)servo);
    printf("Phidget Advanced Servo is closed.\n");

    return scope.Close(Integer::NewFromUnsigned(0));
}

Handle<Value>
setEngaged(const Arguments& args)
{
    HandleScope scope;
    CPhidgetAdvancedServo_setEngaged(servo, args[0]->Int32Value(), args[1]->Int32Value());
    return scope.Close(Integer::NewFromUnsigned(0));
}

Handle<Value>
getPosition(const Arguments& args)
{
    double curr_pos;

    HandleScope scope;
    CPhidgetAdvancedServo_getPosition(servo, args[0]->Int32Value(), &curr_pos);
    return scope.Close(Integer::NewFromUnsigned(curr_pos));
}

Handle<Value>
setPosition(const Arguments& args)
{
    int stopped;

    HandleScope scope;
    CPhidgetAdvancedServo_setPosition(servo, args[0]->Int32Value(), args[1]->Int32Value());

    for (;;) {
        CPhidgetAdvancedServo_getStopped(servo, args[0]->Int32Value(), &stopped);

        if (stopped == 1) {
            return scope.Close(Integer::NewFromUnsigned(0));
        }
    }
}

Handle<Value>
getStopped(const Arguments& args)
{
    int stopped;

    HandleScope scope;
    CPhidgetAdvancedServo_getStopped(servo, args[0]->Int32Value(), &stopped);
    return scope.Close(Integer::NewFromUnsigned(stopped));
}

// ------------------------------------------
// Module
// ------------------------------------------

void init(Handle<Object> target) 
{
    // Connection
    target->Set(String::New("attach"), FunctionTemplate::New(attach)->GetFunction());
    target->Set(String::New("close"), FunctionTemplate::New(close)->GetFunction());

    // Servo manipulation
    target->Set(String::New("setEngaged"), FunctionTemplate::New(setEngaged)->GetFunction());
    target->Set(String::New("getPosition"), FunctionTemplate::New(getPosition)->GetFunction());
    target->Set(String::New("setPosition"), FunctionTemplate::New(setPosition)->GetFunction());

    // Status
    target->Set(String::New("getStopped"), FunctionTemplate::New(getStopped)->GetFunction());
}

NODE_MODULE(binding_servo, init);
