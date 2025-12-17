# ProGuard/R8 Rules for Habittus
# This file specifies which classes should be kept during minification

# Keep all native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep all public classes and their public methods
-keepclassmembers class * {
    public <init>(...);
    public <methods>;
}

# Keep enums
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Keep Parcelable implementations
-keep class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator *;
}

# Keep Serializable classes
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# Keep all classes in android.* packages
-keep class android.** { *; }
-keep interface android.** { *; }

# Keep React Native classes
-keep class com.facebook.react.** { *; }
-keep class com.facebook.jni.** { *; }

# Keep Expo classes
-keep class expo.** { *; }
-keep class com.swmansion.** { *; }
-keep class com.th3rdwave.** { *; }

# Keep Kotlin classes
-keep class kotlin.** { *; }
-keep class kotlinx.** { *; }

# Keep all R classes
-keepclassmembers class **.R$* {
    public static <fields>;
}

# Keep BuildConfig
-keep class **.BuildConfig { *; }

# Remove logging
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
}

# Optimization settings
-optimizationpasses 5
-dontusemixedcaseclassnames
-verbose
-optimizations !code/simplification/arithmetic,!code/simplification/cast,!field/*,!class/merging/*

# Keep line numbers for debugging
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# Keep annotations
-keepattributes *Annotation*
-keepattributes Signature
-keepattributes Exceptions
-keepattributes InnerClasses
-keepattributes EnclosingMethod

# Keep generic signatures
-keepattributes Signature

# Keep method parameters
-keepattributes MethodParameters

# Remove unused resources
-dontshrink
-dontoptimize
